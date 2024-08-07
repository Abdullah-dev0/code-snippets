// Purpose: Handle all routes related to github authentication.

import express from "express";
import { githubCallback, githubLogin } from "../controllers/auth.js";
import { sessionManagementMiddleware } from "../middleware/auth.js";

export const githubRouter = express.Router();

githubRouter.use(sessionManagementMiddleware);

githubRouter.get("/github", githubLogin);
githubRouter.get("/github/callback", githubCallback);
