import { useTheme } from "@/providers/theme-provider";
// Lazy load the SyntaxHighlighter component
import { Snippet } from "@/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import AddFavorite from "./AddFavorite";
import DeleteSnippet from "./DeleteSnippet";

interface CardProps {
	snippet: Snippet;
}

SyntaxHighlighter.supportedLanguages;

export const Card = ({ snippet }: CardProps) => {
	const { theme } = useTheme();

	return (
		<div className="p-3 flex flex-col gap-4 h-full ">
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
const CodeBlock = ({ snippet }: { theme: "dark" | "light" | "system"; snippet: Snippet }) => {
	return (
		<div className="overflow-hidden max-h-[260px] rounded-md text-sm flex-1">
			<SyntaxHighlighter
				showLineNumbers
				wrapLines
				customStyle={{ padding: "10px" }}
				language="javascript"
				style={a11yDark}>
				{snippet.code}
			</SyntaxHighlighter>
		</div>
	);
};

// Footer Component
const Footer = ({ snippet }: CardProps) => {
	return (
		<footer className="footer flex justify-between">
			<p>{snippet.language}</p>
			<DeleteSnippet id={snippet.id} />
		</footer>
	);
};
