// just for testing puposes feel free to delete this file

import { Request, Response } from "express";
import { prisma } from "../config/prismaClient.js";
import { User } from "@prisma/client";
import { lucia } from "../config/luciaAuth.js";
import { verifyVerificationCode } from "../utils/verifyVerificationCode.js";

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
			userId: res.locals!.user!.id,
			message: post,
		},
	});

	return res.status(201).json({ message: "Post created successfully" });
};

export const getCurrentUser = async (req: Request, res: Response) => {
	if (!res.locals.session) {
		return res.status(401).json({ error: "Please Login to get data" });
	}

	const { id } = res.locals.user!;

	const user: User | null = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});

	user!.password = undefined as any;

	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	return res.status(200).json({ user });
};

export const emailVerification = async (req: Request, res: Response) => {
	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");

	if (!sessionId) {
		return res.status(401).json({ error: "You must be logged in to verify your email" });
	}

	const { user } = await lucia.validateSession(sessionId);

	if (!user) {
		return res.status(401).json({ error: "You must be logged in to verify your email" });
	}

	const code = req.body.code;

	if (typeof code !== "string") {
		return res.status(400).json({ error: "Invalid code type" });
	}

	const validCode = await verifyVerificationCode(user, code);
	if (!validCode) {
		return res.status(400).json({ error: "Invalid code" });
	}

	await lucia.invalidateUserSessions(user.id);
	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			emailVerified: true,
		},
	});

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	return res.status(200).json({ message: "Email verified" }).appendHeader("Set-Cookie", sessionCookie.serialize());
};
