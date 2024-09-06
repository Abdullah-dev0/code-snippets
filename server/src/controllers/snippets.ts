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
				code,
				language,
			},
		});

		if (!snippet) {
			return res.status(400).json({ error: "There was an error while adding a snippet" }).end();
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
		res.status(400);
	}
};

export const moveToBinOrRestore = async (req: Request, res: Response) => {
	const { snippetId, action } = req.body; // action will be 'delete' or 'restore'
	const { user } = res.locals;

	console.log(action);

	action === "delete" ? true : false;

	try {
		const snippet = await prisma.snippet.findUnique({
			where: {
				id: snippetId,
				userId: user?.id,
			},
		});

		if (!snippet) {
			return res.status(404).json({ error: "Snippet not found" });
		}

		const updatedSnippet = await prisma.snippet.update({
			where: { id: snippetId },
			data: { deleted: action === "delete" ? true : false },
		});

		const message = action === "delete" ? "Snippet moved to Bin successfully" : "Snippet restored successfully";

		return res.status(200).json({ message }).end();
	} catch (error) {
		console.log(`Error ${action === "delete" ? "deleting" : "restoring"} snippet:`, error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllSnippets = async (req: Request, res: Response) => {
	const { user } = res.locals;
	const { deleted } = req.query;

	const action = deleted === "true" ? true : false;

	try {
		const snippets = await prisma.snippet.findMany({
			where: {
				userId: user?.id,
				deleted: action,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return res.status(200).json(snippets).end();
	} catch (error) {
		console.log("Error getting snippets:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteSnippetById = async (req: Request, res: Response) => {
	const { id } = req.body;

	try {
		const snippet = await prisma.snippet.delete({
			where: {
				id: id,
			},
		});

		if (!snippet) {
			return res.status(404).json({ error: "Snippet not found" });
		}

		return res
			.status(200)
			.json({
				message: "Snippet deleted successfully",
			})
			.end();
	} catch (error) {
		console.log("Error deleting snippet:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const updateSnippetById = async (req: Request, res: Response) => {
	const { id, title, description, code, language } = req.body;

	try {
		const snippet = await prisma.snippet.update({
			where: {
				id: id,
			},
			data: {
				title,
				description,
				code,
				language,
			},
		});

		if (!snippet) {
			return res.status(404).json({ error: "Snippet not found" });
		}

		return res
			.status(200)
			.json({
				message: "Snippet updated successfully",
			})
			.end();
	} catch (error) {
		console.log("Error updating snippet:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getSnippetById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const snippet = await prisma.snippet.findUnique({
			where: {
				id: id,
			},
		});

		if (!snippet) {
			return res.status(404).json({ error: "Snippet not found" });
		}

		return res
			.status(200)
			.json({
				data: snippet,
			})
			.end();
	} catch (error) {
		console.log("Error getting snippet:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
