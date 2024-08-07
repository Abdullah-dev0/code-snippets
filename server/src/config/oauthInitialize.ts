import { GitHub } from "arctic";
import { Google } from "arctic";

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);

export const googleAuth = new Google(
	process.env.GOOGLE_CLIENT_ID!,
	process.env.GOOGLE_CLIENT_SECRET!,
	"http://localhost:5173/api/login/google/callback",
);
