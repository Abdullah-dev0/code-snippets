export interface User {
	user: {
		id: string;
		username: string;
		email: string;
		emailVerified: boolean;
		avatar: string;
		createdAt: string;
	};
}

export interface Snippet {
	id: string;
	title: string;
	language: string;
	description: string;
	code: string;
}
