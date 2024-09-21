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
	console.log(snippet.createdAt);

	return (
		<header className="flex flex-col gap-6">
			<div>
				<div className="flex justify-between">
					<h1 className="text-xl font-semibold">{snippet.title}</h1>
					{type === "dashboard" ? (
						<div className="flex gap-2 items-center">
							<AddFavorite snippetId={snippet.id} />
							<Edit snippet={snippet} />
						</div>
					) : (
						<DeleteOrRestoreSnippet type="restore" id={snippet.id} />
					)}
				</div>
				<p className="text-sm font-medium ">
					{new Date(snippet.createdAt).toLocaleString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
						timeZone: "UTC",
					})}
				</p>
			</div>
			<p className="text-md font-medium ">{snippet.description}</p>
		</header>
	);
};

// CodeBlock Component
const CodeBlock = ({ snippet }: CardProps) => {
	const [copySuccess, setCopySuccess] = useState(false);

	const handleCopy = () => {
		copy(snippet.code);
		setCopySuccess(true);
		toast.success("Copied to clipboard");
	};

	useEffect(() => {
		if (copySuccess) {
			setTimeout(() => {
				setCopySuccess(false);
			}, 4000);
		}
	}, [copySuccess]);

	return (
		<div className="rounded-md text-sm flex-1 relative ">
			<SyntaxHighlighter
				showLineNumbers
				className="custom-scrollbar"
				wrapLines={false}
				customStyle={{
					padding: "16px",
					maxHeight: "250px",
					overflowX: "auto", // Enable horizontal scrolling
					whiteSpace: "nowrap", // Prevent wrapping of code lines
				}}
				language="javascript"
				style={a11yDark}>
				{snippet.code}
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
			<p className="text-sm dark:text-white text-gray-900 capitalize font-semibold bg-primary/80 p-2 rounded-md">
				{snippet.language}
			</p>
			{type === "dashboard" && <DeleteOrRestoreSnippet id={snippet.id} type="bin" />}
		</footer>
	);
};
