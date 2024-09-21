import { Card } from "@/components/shared/Card";
import SearchSnippet from "@/components/shared/SearchSnippet";
import { useGetAllSnippets, useGetBinSnippets } from "@/Hooks/useGetAllSnippets";
import { useGetFavSnippet } from "@/Hooks/useGetFavSnippet";
import { Snippet } from "@/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const { data, isFetching } = useGetAllSnippets(searchTerm);

	const {} = useGetFavSnippet();

	const {} = useGetBinSnippets();

	return (
		<>
			<SearchSnippet setSearchTerm={setSearchTerm} />
			<div className="grid lg:grid-cols-2 gap-5 grid-cols-1">
				{isFetching ? (
					<Loader2 className="animate-spin text-center mx-auto col-span-2 " />
				) : data && data.length === 0 ? (
					<p className="text-md text-center col-span-2">No snippets found </p>
				) : (
					data?.map((snippet: Snippet) => <Card type="dashboard" key={snippet.id} snippet={snippet} />)
				)}
			</div>
		</>
	);
};

export default Dashboard;
