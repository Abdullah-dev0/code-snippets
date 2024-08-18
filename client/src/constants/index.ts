export const navLinks = [
	{
		id: 1,
		title: "All snippets",
		Link: "/dashboard",
		icon: "/src/public/grid.svg",
	},
	{
		id: 2,
		title: "Favorites",
		Link: "favorites",
		icon: "/src/public/Heart.svg",
	},
	{
		id: 3,
		title: "Bin",
		Link: "bin",
		icon: "/src/public/bin.svg",
	},
];

export const defaultValues = {
	username: "",
	email: "",
	password: "",
};

export const snippetDefaultValues = {
	title: "",
	language: "",
	description: "",
	code: "",
};

export const languages = [
	"javascript",
	"typescript",
	"python",
	"java",
	"golang",
	"ruby",
	"markdown",
	"csharp",
	"xml",
	"json",
];

export type language = typeof languages[number];


