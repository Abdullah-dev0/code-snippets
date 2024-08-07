import express from "express";

// import { githubCallback } from "../controllers/auth.js";
import { googleCallback } from "../controllers/auth.js";

export const callabackGoogleRouter = express.Router();


callabackGoogleRouter.get("/callback", googleCallback);
