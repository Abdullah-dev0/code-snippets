import express from "express";

// import { githubCallback } from "../controllers/auth.js";
import { googleLogin } from "../controllers/auth.js";

export const googleRouter = express.Router();

googleRouter.get("/google", googleLogin);
