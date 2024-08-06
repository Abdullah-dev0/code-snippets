import express from "express";

import { login, logout, signUp } from "../controllers/auth.js";
import { sessionManagementMiddleware } from "../middleware/auth.js";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", sessionManagementMiddleware, logout);
