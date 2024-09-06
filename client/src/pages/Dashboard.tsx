import { Card } from "@/components/shared/Card";
import Snippetform from "@/components/shared/Snippetform";
import { useGetAllSnippets } from "@/Hooks/useGetAllSnippets";
import { Snippet } from "@/types";

const Dashboard = () => {
	const { data, isLoading } = useGetAllSnippets();

	return (
		<div className="grid lg:grid-cols-2 gap-5 grid-cols-1">
			{isLoading && <div className="text-red text-4xl">Loading...</div>}
			{data?.map((snippet: Snippet) => (
				<Card key={snippet.id} snippet={snippet} />
			))}
			<Snippetform type="create" />
		</div>
	);
};

export default Dashboard;
