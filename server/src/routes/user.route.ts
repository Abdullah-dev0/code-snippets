import express from "express";

import { add, login, logout, signUp } from "../controllers/user.js";
import { originVerificationMiddleware, sessionManagementMiddleware } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/add", sessionManagementMiddleware, add);
userRouter.post("/auth/signup", signUp);
userRouter.post("/auth/login", login);
userRouter.get("/auth/logout", sessionManagementMiddleware, logout);
