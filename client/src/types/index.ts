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
	userid: string;
	title: string;
	language: string;
	description: string;
	code: string;
	createdAt: string;
}
