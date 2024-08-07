import express from "express";

// import { githubCallback } from "../controllers/auth.js";
import { googleCallback, googleLogin } from "../controllers/auth.js";

export const googleRouter = express.Router();

googleRouter.get("/login/google", googleLogin);
googleRouter.get("/login/google/callback", googleCallback);
