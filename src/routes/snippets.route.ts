// purpose of this file is to define the routes for the user entity

import express from "express";

import {
	addSnippet,
	addToFavoritesOrRemove,
	deleteSnippetsById,
	getAllFavSnippets,
	getAllSnippets,
	moveToBinOrRestore,
	updateSnippetById,
} from "../controllers/snippets.js";
import { sessionManagementMiddleware } from "../middleware/auth.js";
import { verifiedEmail } from "../middleware/verified.js";

export const snippetRouter = express.Router();

snippetRouter.use(sessionManagementMiddleware);
snippetRouter.use(verifiedEmail);
snippetRouter.post("/create", addSnippet);
snippetRouter.get("/getsnippets", getAllSnippets);
snippetRouter.delete("/emptybin", deleteSnippetsById);
snippetRouter.put("/update", updateSnippetById);
snippetRouter.put("/snippet/action", moveToBinOrRestore);
snippetRouter.post("/addfavorite", addToFavoritesOrRemove);
snippetRouter.get("/getfavorites", getAllFavSnippets);
