import { Snippet } from "@/types";
import copy from "copy-to-clipboard";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { toast } from "sonner";
import { Button } from "../ui/button";
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
			<p>{snippet.createdAt.toString().split("T")[0]}</p>
			<p>{snippet.description}</p>
		</header>
	);
};

// CodeBlock Component
const CodeBlock = ({ snippet }: { snippet: Snippet }) => {
	let code;
	if (snippet.code.length < 280) {
		code = snippet.code;
	} else {
		code = snippet.code.substring(0, 370) + "  ...";
	}

	const handleCopy = () => {
		copy(snippet.code);
		toast.success("Copied to clipboard");
	};

	return (
		<div className="rounded-md text-sm flex-1 relative">
			<SyntaxHighlighter
				showLineNumbers
				wrapLines
				customStyle={{ padding: "10px", maxHeight: "350px" }}
				language="javascript"
				style={a11yDark}>
				{code}
			</SyntaxHighlighter>
			<Button
				variant={"ghost"}
				onClick={handleCopy}
				className="absolute top-2 right-2 flex items-center gap-1 hover:bg-transparent  p-1">
				<Copy size={22} />
			</Button>
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
