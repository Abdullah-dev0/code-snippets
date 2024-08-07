import cookieParser from "cookie-parser";
import core from "cors";
import express from "express";
import morgan from "morgan";
import { userRouter } from "./routes/user.route.js";
import { authRouter } from "./routes/auth.route.js";
import { githubRouter } from "./routes/github.route.js";
import { googleRouter } from "./routes/google.route.js";
import { originVerificationMiddleware } from "./middleware/auth.js";
import { callabackGoogleRouter } from "./routes/callbackGoogle.js";

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

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.use("/api/auth", authRouter);
app.use("/login", githubRouter);
app.use("/api/login/google", callabackGoogleRouter);
app.use("/login", googleRouter);
app.use("/api", userRouter);
