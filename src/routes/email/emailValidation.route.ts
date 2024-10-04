import express from "express";
import { emailVerification, resendVerification } from "../../controllers/email.js";
import { sessionManagementMiddleware } from "../../middleware/auth.js";
export const emailRouter = express.Router();
import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

// Create a rate limiter specific to the verification code route
const verificationLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes window
	max: 1, // Limit each user to 3 requests per 15 minutes
	message: "You have exceeded the maximum number of verification code requests. Please try again after 15 minutes.",
	keyGenerator: (req: Request) => {
		console.log(req.ip, "req.ip");
		return req.ip || "unknown-ip";
	},
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	statusCode: 429, // Status code to return when rate limit is exceeded
});

emailRouter.use(sessionManagementMiddleware);

emailRouter.post("/email-verification", emailVerification);
emailRouter.post("/resent-verification", verificationLimiter, resendVerification);
