// just for testing puposes feel free to delete this file

import { Request, Response } from "express";
import { prisma } from "../config/prismaClient.js";
import { emailVerificationCode, User } from "@prisma/client";
import { lucia } from "../config/luciaAuth.js";
import { verifyVerificationCode } from "../utils/email/verifyVerificationCode.js";

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
	// Check if user is logged in for secuery reasons you will do in frontend anyway
	if (!res.locals.session) {
		return res.status(401).json({ error: "You must be logged in" }).end();
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
	try {
		// Check if the email is already verified
		if (res.locals.session || res.locals.user?.emailVerified) {
			return res.status(200).json({ message: "Email already verified" });
		}

		// Extract and validate the verification code from the request body
		const code: string = req.body.pin;
		if (!code) {
			return res.status(400).json({ error: "Code is required" });
		}

		// Find the verification code in the database
		const user: emailVerificationCode | null = await prisma.emailVerificationCode.findFirst({
			where: {
				code: code,
			},
		});

		// Check if the code is valid
		const validCode = await verifyVerificationCode(user, code);
		if (!validCode) {
			return res.status(400).json({ error: "The verification code you entered is incorrect" });
		}

		// Update user's email verification status
		await prisma.user.update({
			where: {
				id: user?.user_id,
			},
			data: {
				emailVerified: true,
			},
		});

		// Create a new session and set the session cookie
		const session = await lucia.createSession(user?.user_id!, {});
		res.setHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize());

		// Respond with success
		return res.status(200).json({ message: "Email verified successfully" });
	} catch (error) {
		console.error("Error during email verification:", error);
		// Handle unexpected errors
		return res.status(500).json({ error: "An unexpected error occurred. Please try again." });
	}
};
