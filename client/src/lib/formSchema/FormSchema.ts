import z from "zod";

export const SignupSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const SigninSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});
