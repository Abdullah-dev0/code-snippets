// purpose of this file is to define the routes for the user entity

import express from "express";

import { add } from "../controllers/user.js";
import { sessionManagementMiddleware } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/add", sessionManagementMiddleware, add);
