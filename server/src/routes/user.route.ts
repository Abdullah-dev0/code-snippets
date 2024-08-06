import express from "express";

import { add } from "../controllers/user.js";
import { sessionManagementMiddleware } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/add", sessionManagementMiddleware, add);
