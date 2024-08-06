import express from "express";

import { githubCallback, githubLogin } from "../controllers/auth.js";

export const githubRouter = express.Router();

githubRouter.get("/github", githubLogin);
githubRouter.get("/github/callback", githubCallback);
