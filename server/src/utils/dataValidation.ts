import z from "zod";

export const SignupData = z.object({
	username: z.string().min(1, "Email is required").trim(),
	password: z.string().min(3).min(3, "Password must be at least 3 characters").trim(),
	// username: z.string().min(1, "Username is required").trim().toLowerCase(),
});

type SignupData = z.infer<typeof SignupData>;
