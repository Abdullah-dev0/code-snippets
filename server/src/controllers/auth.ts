import { hash, verify } from "@node-rs/argon2";
import { generateCodeVerifier, generateState, OAuth2RequestError } from "arctic";
import { Request, Response } from "express";
import { parseCookies, serializeCookie } from "oslo/cookie";
import { github, googleAuth } from "../config/oauthInitialize.js";
import { lucia } from "../config/luciaAuth.js";
import { prisma } from "../config/prismaClient.js";
import { LoginData, SignupData } from "../utils/dataValidation.js";
import { User } from "@prisma/client";

export const signUp = async (req: Request, res: Response) => {
	const signupData = SignupData.safeParse(req.body);

	if (!signupData.success) {
		return res.status(400).json({ error: signupData.error });
	}

	const passwordHash = await hash(signupData.data.password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	//cheack if username already exists
	try {
		const existingUser = await prisma.user.findFirst({
			where: {
				username: signupData.data.username,
			},
		});

		if (existingUser) {
			return res.status(400).json({ error: "Username already used" });
		}
	} catch (error: any) {
		console.log(error.message);
	}

	try {
		const user = await prisma.user.create({
			data: {
				username: signupData.data.username,
				email: signupData.data.email,
				password: passwordHash,
			},
		});

		if (user) {
			const session = await lucia.createSession(user.id, {});
			return res
				.status(201)
				.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
				.json({
					message: "User created successfully",
					userData: {
						id: user.id,
						username: user.username,
					},
				});
		}

		return res.status(400).json({ error: "Failed to create user" });
	} catch (error: any) {
		console.error(error.message);
	}
};

export const login = async (req: Request, res: Response) => {
	const loginData = LoginData.safeParse(req.body);

	if (!loginData.success) {
		return res.status(400).json({ error: loginData.error });
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			username: loginData.data.username,
		},
	});

	if (!existingUser) {
		return res.status(400).json({ error: "Incorrect username or password" });
	}

	const validPassword = await verify(existingUser.password!, loginData.data.password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	if (!validPassword) {
		return res.status(400).json({ error: "Incorrect username or password" });
	}

	const session = await lucia.createSession(existingUser.id, {});

	res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).json({
		message: "Logged in successfully",
		userData: {
			id: existingUser.id,
			username: existingUser.username,
		},
	});
};

export const githubLogin = async (req: Request, res: Response) => {
	const state = generateState();
	const url = await github.createAuthorizationURL(state, {
		scopes: ["user:email"],
	});
	res
		.status(302)
		.appendHeader(
			"Set-Cookie",
			serializeCookie("github_oauth_state", state, {
				path: "/",
				secure: process.env.NODE_ENV === "production",
				httpOnly: true,
				maxAge: 60 * 10,
				sameSite: "lax",
			}),
		)
		.redirect(url.toString());
};

export const githubCallback = async (req: Request, res: Response) => {
	const code = req.query.code?.toString() ?? null;
	const state = req.query.state?.toString() ?? null;
	const storedState = parseCookies(req.headers.cookie ?? "").get("github_oauth_state") ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		res
			.status(400)
			.json({
				error: "Invalid request",
			})
			.end();
		return;
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);

		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});

		const githubUser: User & Github = await githubUserResponse.json();

		const existingUser = await prisma.account.findFirst({
			where: {
				providerAccountId: githubUser.id.toString(),
			},
		});

		console.log("existingUser", existingUser);

		if (existingUser) {
			const session = await lucia.createSession(existingUser.userId, {});
			res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).redirect("/");
			return;
		}

		const user = await prisma.user.create({
			data: {
				username: githubUser.login,
				email: githubUser.email,
				avatar: githubUser.avatar_url,
				Account: {
					create: {
						providerAccountId: githubUser.id.toString(),
						provider: "github",
					},
				},
			},
		});

		const session = await lucia.createSession(user.id, {});
		res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).redirect("/");
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
			// invalid code
			res.status(400).end();
			return;
		}
		console.log(e);
		res.status(500).end();
	}
};

export const googleLogin = async (req: Request, res: Response) => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
		scopes: ["profile", "email"],
	});

	res
		.status(302)
		.appendHeader(
			"Set-Cookie",
			serializeCookie("google_oauth_state", state, {
				path: "/",
				secure: process.env.NODE_ENV === "production",
				httpOnly: true,
				maxAge: 60 * 10,
				sameSite: "lax",
			}),
		)
		.appendHeader(
			"Set-Cookie",
			serializeCookie("google_code_verifier", codeVerifier, {
				path: "/",
				secure: process.env.NODE_ENV === "production",
				httpOnly: true,
				maxAge: 60 * 10,
				sameSite: "lax",
			}),
		)
		.redirect(url.toString());
};

export const googleCallback = async (req: Request, res: Response) => {
	const code = req.query.code?.toString() ?? null;
	const state = req.query.state?.toString() ?? null;
	const storedState = parseCookies(req.headers.cookie ?? "").get("google_oauth_state") ?? null;
	const codeVerifier = parseCookies(req.headers.cookie ?? "").get("google_code_verifier") ?? null;

	if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
		res
			.status(400)
			.json({
				error: "Invalid request",
			})
			.end();
		return;
	}

	try {
		const tokens = await googleAuth.validateAuthorizationCode(code, codeVerifier);

		const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});

		const googleUser: User & GoogleUser = await response.json();

		const existingUser = await prisma.account.findFirst({
			where: {
				providerAccountId: googleUser.sub,
			},
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.userId, {});

			
			res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).redirect("/");
			return;
		}

		console.log(googleUser);

		const user = await prisma.user.create({
			data: {
				username: googleUser.name,
				email: googleUser.email,
				avatar: googleUser.picture,
				emailVerified: googleUser.emailVerified,
				Account: {
					create: {
						providerAccountId: googleUser.sub,
						provider: "google",
					},
				},
			},
		});

		const session = await lucia.createSession(user.id, {});
		res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).redirect("/");
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
			// invalid code
			console.log("bad_verification_code", e);
			res.status(400).end();
			return;
		}
		console.log(e);
		res.status(500).end();
	}
};

export const logout = async (req: Request, res: Response) => {
	if (!res.locals.session) {
		return res.status(401).json({ error: "You must be logged in to logout" }).end();
	}

	await lucia.invalidateSession(res.locals.session.id);

	res.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize()).end();
};

interface Github {
	login: string;
	avatar_url: string;
}

interface GoogleUser {
	sub: string;
	email: string;
	name: string;
	picture: string;
}
