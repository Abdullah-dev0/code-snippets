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

		if (!updatedSnippet) {
			res.status(400).json({ error: "There was an error while moving snippet to bin" }).end();
			console.log("Error updating snippet:");
			return;
		}

		await prisma.favorite.deleteMany();

		return res.status(200).end();
	} catch (error) {
		console.log(`Error ${action === "delete" ? "deleting" : "restoring"} snippet:`, error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const addToFavoritesOrRemove = async (req: Request, res: Response) => {
	const { snippetId } = req.body;
	const { user } = res.locals;

	try {
		const snippet = await prisma.snippet.findUnique({
			where: {
				id: snippetId,
			},
		});

		if (!snippet) {
			return res.status(404).json({ error: "Snippet not found" });
		}

		const favorite = await prisma.favorite.findFirst({
			where: {
				snippetId: snippetId,
				userId: user?.id,
			},
		});

		if (favorite) {
			await prisma.favorite.delete({
				where: {
					id: favorite.id,
				},
			});

			return res.status(200).json({ message: "Snippet removed from favorites" }).end();
		}

		const response = await prisma.favorite.create({
			data: {
				snippetId: snippetId,
				userId: user?.id,
				isFavorite: true,
			},
		});

		if (!response) {
			return res.status(400).json({ error: "There was an error while adding to favorites" }).end();
		}

		return res.status(200).json({ message: "Snippet added to favorites" }).end();
	} catch (error) {
		console.log("Error adding to favorites:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllSnippets = async (req: Request, res: Response) => {
	const { user } = res.locals;
	const { deleted, search } = req.query;

	const action = deleted === "true" ? true : false;

	console.log(search);

	try {
		const snippets = await prisma.snippet.findMany({
			where: {
				userId: user?.id,
				deleted: action,
				OR: search ? [{ title: { contains: search as string, mode: "insensitive" } }] : undefined,
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

export const deleteSnippetsById = async (req: Request, res: Response) => {
	try {
		await prisma.snippet.deleteMany({
			where: {
				deleted: true,
			},
		});

		await prisma.favorite.deleteMany();

		return res
			.status(200)
			.json({
				message: "All Snippets deleted successfully",
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

export const getAllFavSnippets = async (req: Request, res: Response) => {
	try {
		const snippets = await prisma.favorite.findMany({
			where: {
				userId: res.locals?.user?.id,
			},
			select: {
				Snippet: true,
				isFavorite: true,
			},
		});

		if (!snippets) {
			return res.status(404).json({ error: "No favorite snippets found" }).end();
		}

		const snippetsArray = snippets.map((item) => ({
			...item.Snippet,
			isFavorite: item.isFavorite,
		}));

		return res.status(200).json(snippetsArray).end();
	} catch (error) {
		console.log("Error getting snippet:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
