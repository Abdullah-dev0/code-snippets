import z from "zod";

export const SnippetSchema = z.object({
	title: z.string().min(1, "Tiltle Must Be At Least 3 Characters"),
	language: z.string().min(1, "Please Select A Language"),
	description: z.string().min(3, "Please Write A Description").max(200).trim(),
	code: z.string().min(3, "Code Should not Be empty").max(1000).trim(),
});
