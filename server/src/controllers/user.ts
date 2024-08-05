import { hash, verify } from "@node-rs/argon2";
import { Request, Response } from "express";
import { generateIdFromEntropySize } from "lucia";
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

	const userId = generateIdFromEntropySize(10); // 16 characters long

	try {
		const user = await prisma.user.create({
			data: {
				id: userId,
				username: signupData.data.username,
				password: passwordHash,
			},
		});

		if (user) {
			const session = await lucia.createSession(userId, {});
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

export const logout = async (req: Request, res: Response) => {
	if (!res.locals.session) {
		return res.status(401).json({ error: "You must be logged in to logout" }).end();
	}


	await lucia.invalidateSession(res.locals.session.id);

	return res.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
};

export const add = async (req: Request, res: Response) => {
	if (!res.locals.session) {
		return res
			.status(401)
			.json({
				error: "You must be logged in to create a post",
			})
			.end();
	}
	const post: string = req.body.message;
	if (!post) {
		return res.status(400).json({ error: "Message is required" });
	}

	await prisma.post.create({
		data: {
			id: generateIdFromEntropySize(10),
			userId: res.locals!.user!.id,
			message: post,
		},
	});

	return res.status(201).json({ message: "Post created successfully" });
};
