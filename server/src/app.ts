import cookieParser from "cookie-parser";
import core from "cors";
import express from "express";
import morgan from "morgan";
import { userRouter } from "./routes/user.route.js";
import { originVerificationMiddleware, sessionManagementMiddleware } from "./middleware/auth.js";

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

app.use("/api", userRouter);