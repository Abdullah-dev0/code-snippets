import { Card } from "@/components/shared/Card";
import SearchSnippet from "@/components/shared/SearchSnippet";
import Snippetform from "@/components/shared/Snippetform";
import { useGetAllSnippets, useGetBinSnippets } from "@/Hooks/useGetAllSnippets";
import { useGetFavSnippet } from "@/Hooks/useGetFavSnippet";
import { Snippet } from "@/types";
import { Loader } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const { data, isFetching = true } = useGetAllSnippets(searchTerm);

	const {} = useGetFavSnippet();

	const {} = useGetBinSnippets();

	return (
		<>
			<SearchSnippet setSearchTerm={setSearchTerm} />
			<div className="grid lg:grid-cols-2 gap-5 grid-cols-1">
				{isFetching ? (
					<div className="flex justify-center items-center h-full">
						<Loader />
					</div>
				) : data && data.length === 0 ? (
					<div className="flex justify-center items-center h-full">
						<p>No snippets found</p>
					</div>
				) : (
					data?.map((snippet: Snippet) => <Card type="dashboard" key={snippet.id} snippet={snippet} />)
				)}
				<Snippetform type="create" />
			</div>
		</>
	);
};

export default Dashboard;
