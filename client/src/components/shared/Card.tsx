import { Snippet } from "@/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import AddFavorite from "./AddFavorite";
import DeleteSnippet from "./DeleteSnippet";
import Edit from "./Edit";

interface CardProps {
	snippet: Snippet;
}

export const Card = ({ snippet }: CardProps) => {
	console.log("Card component rendered");
	return (
		<div className="p-3 flex flex-col gap-4 h-full ">
			<Header snippet={snippet} />
			<CodeBlock snippet={snippet} />
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
				<div className="flex gap-3 items-center">
					<AddFavorite />
					<Edit snippet={snippet} />
				</div>
			</div>
			<p>{new Date(snippet.createdAt).getDate().toLocaleString()}</p>
			<p>{snippet.description}</p>
		</header>
	);
};

// CodeBlock Component
const CodeBlock = ({ snippet }: { snippet: Snippet }) => {
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
		<footer className="flex justify-between">
			<p>{snippet.language}</p>
			<DeleteSnippet id={snippet.id} />
		</footer>
	);
};
