// purpose of this file is to define the routes for the user entity

import express from "express";

import { addSnippet, getAllSnippets } from "../controllers/snippets.js";
import { sessionManagementMiddleware } from "../middleware/auth.js";
import { verifiedEmail } from "../middleware/verified.js";

export const snippetRouter = express.Router();

snippetRouter.use(sessionManagementMiddleware);
snippetRouter.use(verifiedEmail);
snippetRouter.post("/create", addSnippet);
snippetRouter.get("/getsnippets", getAllSnippets);
