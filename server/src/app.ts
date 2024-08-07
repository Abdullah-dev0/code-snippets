//This file is the entry point for the server. It sets up the express app, middleware, and routes.

import cookieParser from "cookie-parser";
import core from "cors";
import express from "express";
import morgan from "morgan";
import { authRouter } from "./routes/auth.route.js";
import { githubRouter } from "./routes/github.route.js";
import { googleRouter } from "./routes/google.route.js";
import { userRouter } from "./routes/user.route.js";
import { lucia } from "./config/luciaAuth.js";
import cron from "node-cron";

export const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(originVerificationMiddleware);

app.use(morgan("dev"));

app.use(cookieParser());


const corsOptions = {
	origin: "http://localhost:5173", // Replace with your production domain
	methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(core(corsOptions));



// Cron job to clean expired sessions every Sunday at midnight.
cron.schedule("0 0 * * 0", async () => {
	console.log("Running cron job to clean cookies");
	await lucia.deleteExpiredSessions();
});


app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.use("/api/auth", authRouter);


app.use("/login", githubRouter);


app.use("/api", googleRouter);


app.use("/api", userRouter);
