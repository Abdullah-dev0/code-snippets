import { Snippet, User } from "@prisma/client";
import { prisma } from "../config/prismaClient.js";
import { Request, Response } from "express";

export const addSnippet = async (req: Request, res: Response) => {
	const { title, description, code, language } = req.body;
	const user = res.locals.user as User;
	try {
		const snippet: Snippet = await prisma.snippet.create({
			data: {
				userId: user.id,
				title,
				description,
				code: code.toString(),
				language,
			},
		});

		if (!snippet) {
			return res.status(400).json({ error: "Could not add snippet" });
		}

		return res
			.status(201)
			.json({
				message: "Snippet added successfully",
				data: snippet,
			})
			.end();
	} catch (error) {
		console.log("Error adding snippet:", error);
	}
};

export const getAllSnippets = async (req: Request, res: Response) => {
	const { user } = res.locals;
	try {
		const snippets = await prisma.snippet.findMany({
			where: {
				userId: user?.id,
			},
		});

		if (snippets.length === 0) {
			return res.status(404).json({ error: "No snippets found" });
		}

		return res.status(200).json(snippets);
	} catch (error) {
		console.log("Error getting snippets:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
