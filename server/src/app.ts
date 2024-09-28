//This file is the entry point for the server. It sets up the express app, middleware, and routes.
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { authRouter } from "./routes/auth/auth.route.js";
import { githubRouter } from "./routes/auth/github.route.js";
import { googleRouter } from "./routes/auth/google.route.js";
import { userRouter } from "./routes/user.route.js";
import { cleanExpiredSessionJob, cleanExpiredTokensJob } from "./utils/job/index.js";
import { emailRouter } from "./routes/email/emailValidation.route.js";
import { snippetRouter } from "./routes/snippets.route.js";

export const app = express();

const corsOptions = {
	origin: ["https://codenest.techonline.live", "http://localhost:5173"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	preflightContinue: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(originVerificationMiddleware);

app.use(morgan("dev"));

app.use(cookieParser());

cleanExpiredSessionJob();

cleanExpiredTokensJob();

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.use("/api/auth", authRouter);

app.use("/login", githubRouter);

app.use("/api", googleRouter);

app.use("/api", userRouter);

app.use("/api", emailRouter);

app.use("/api", snippetRouter);

app.use("*", (req, res) => {
	res.status(404).json({ error: "Not found" });
});
