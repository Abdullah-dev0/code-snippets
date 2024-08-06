import { hash, verify } from "@node-rs/argon2";
import { generateState, OAuth2RequestError } from "arctic";
import { Request, Response } from "express";
import { parseCookies, serializeCookie } from "oslo/cookie";
import { github } from "../config/githubInitialize.js";
import { lucia } from "../config/luciaAuth.js";
import { prisma } from "../config/prismaClient.js";
import { SignupData } from "../utils/dataValidation.js";

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
	const username: string = req.body.username;

	const password: string = req.body.password;
	console.log("username", username);

	const existingUser = await prisma.user.findFirst({
		where: {
			username: username,
		},
	});

	if (!existingUser) {
		return res.status(400).json({ error: "Incorrect username or password" });
	}

	const validPassword = await verify(existingUser.password, password, {
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
	const url = await github.createAuthorizationURL(state);
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
	console.log("github callback");
	const code = req.query.code?.toString() ?? null;
	const state = req.query.state?.toString() ?? null;
	const storedState = parseCookies(req.headers.cookie ?? "").get("github_oauth_state") ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		console.log(code, state, storedState);
		res.status(400).end();
		return;
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);

		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});

		const githubUser: GitHubUser = await githubUserResponse.json();

		const existingUser = await prisma.user.findFirst({
			where: {
				github_id: githubUser.id,
			},
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			res.append("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).redirect("/");
			return;
		}

		const user = await prisma.user.create({
			data: {
				username: githubUser.login,
				github_id: githubUser.id,
				email: "",
				password: "",
			},
		});

		const session = await lucia.createSession(user.id, {});
		res.append("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).redirect("/");
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

interface GitHubUser {
	id: number;
	login: string;
	email: string;
}

export const logout = async (req: Request, res: Response) => {
	if (!res.locals.session) {
		return res.status(401).json({ error: "You must be logged in to logout" }).end();
	}

	await lucia.invalidateSession(res.locals.session.id);

	res.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize()).end();
};
