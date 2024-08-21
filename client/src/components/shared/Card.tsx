import { useTheme } from "@/providers/theme-provider";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import AddFavorite from "./AddFavorite";
import DeleteSnippet from "./DeleteSnippet";
import { Snippet } from "@/types";

interface CardProps {
	snippet: Snippet;
}

export const Card = ({ snippet }: CardProps) => {
	const { theme } = useTheme();
	return (
		<div className="shadow-md p-3 flex flex-col gap-4">
			<Header snippet={snippet} />
			<CodeBlock theme={theme} snippet={snippet} />
			<Footer snippet={snippet} />
		</div>
	);
};

// Header Component
const Header = ({ snippet }: CardProps) => {
	return (
		<header className="flex flex-col gap-3">
			<div className="flex justify-between">
				<h1 className="text-md font-bold">{snippet.title}</h1>
				<AddFavorite />
			</div>
			{/* <p>{new Date(snippet.createdAt).toLocaleDateString()}</p> */}
			<p>{snippet.description}</p>
		</header>
	);
};

// CodeBlock Component
const CodeBlock = ({ theme, snippet }: { theme: "dark" | "light" | "system"; snippet: Snippet }) => {
	const subString = `${snippet.code.substring(0, 420)}
 ...`;

	return (
		<div className="rounded-md text-sm overflow-hidden">
			<SyntaxHighlighter
				customStyle={{ maxHeight: "300px" }}
				wrapLongLines
				language={snippet.language}
				style={theme === "dark" ? anOldHope : materialLight}>
				{subString}
			</SyntaxHighlighter>
		</div>
	);
};

// Footer Component
const Footer = ({ snippet }: CardProps) => {
	return (
		<footer className="footer flex justify-between">
			<p>{snippet.language}</p>
			<DeleteSnippet />
		</footer>
	);
};
