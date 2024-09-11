import { Snippet } from "@/types";
import copy from "copy-to-clipboard";
import { Copy, CopyCheck } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddFavorite from "./AddFavorite";
import DeleteOrRestoreSnippet from "./DeleteOrRestoreSnippet";
import Edit from "./Edit";
interface CardProps {
	snippet: Snippet;
	type?: "bin" | "dashboard";
}

export const Card = ({ snippet, type }: CardProps) => {
	return (
		<div className="p-3 flex flex-col gap-4 h-full justify-center ">
			<Header type={type} snippet={snippet} />
			<CodeBlock type={type} snippet={snippet} />
			<Footer type={type} snippet={snippet} />
		</div>
	);
};

// Header Component
const Header = ({ snippet, type }: CardProps) => {
	return (
		<header className="flex flex-col gap-3">
			<div className="flex justify-between">
				<h1 className="text-md font-bold">{snippet.title}</h1>
				{type === "dashboard" ? (
					<div className="flex gap-2 items-center">
						<AddFavorite snippetId={snippet.id} />
						<Edit snippet={snippet} />
					</div>
				) : (
					<DeleteOrRestoreSnippet type="restore" id={snippet.id} />
				)}
			</div>
			<p>{snippet.createdAt.toString().split("T")[0]}</p>
			<p>{snippet.description}</p>
		</header>
	);
};

// CodeBlock Component
const CodeBlock = ({ snippet }: CardProps) => {
	const [copySuccess, setCopySuccess] = useState(false);
	let code;
	if (snippet.code.length < 280) {
		code = snippet.code;
	} else {
		code = snippet.code.substring(0, 370) + "  ...";
	}

	const handleCopy = () => {
		copy(snippet.code);
		setCopySuccess(true);
		toast.success("Copied to clipboard");
	};

	useEffect(() => {
		if (copySuccess) {
			setTimeout(() => {
				setCopySuccess(false);
			}, 5000);
		}
	}, [copySuccess]);

	return (
		<div className="rounded-md text-sm flex-1 relative">
			<SyntaxHighlighter
				showLineNumbers
				wrapLines
				customStyle={{ padding: "16px", maxHeight: "350px" }}
				language="javascript"
				style={a11yDark}>
				{code}
			</SyntaxHighlighter>

			{copySuccess ? (
				<CopyCheck size={30} className="absolute top-3 text-white cursor-pointer right-1 flex items-center p-1" />
			) : (
				<Copy
					size={30}
					onClick={handleCopy}
					className="absolute top-3 text-white cursor-pointer right-1 flex items-center p-1"
				/>
			)}
		</div>
	);
};

// Footer Component
const Footer = ({ snippet, type }: CardProps) => {
	return (
		<footer className="flex justify-between">
			<p>{snippet.language}</p>
			{type === "dashboard" && <DeleteOrRestoreSnippet id={snippet.id} type="bin" />}
		</footer>
	);
};
