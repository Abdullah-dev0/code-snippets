import z from "zod";

export const SignupData = z.object({
	email: z.string().email().min(1, "Email is required").trim(),
	password: z.string().min(3).min(3, "Password must be at least 3 characters").trim(),
	username: z.string().min(1, "Username is required").trim().toLowerCase(),
});

export const LoginData = z.object({
	username: z.string().min(1, "email is required").trim().toLowerCase(),
	password: z.string().min(3, "Password must be at least 3 characters").trim(),
});

type SignupData = z.infer<typeof SignupData>;
