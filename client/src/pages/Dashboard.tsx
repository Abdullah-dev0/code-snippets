import { Card } from "@/components/shared/Card";
import Snippetform from "@/components/shared/Snippetform";
import { useGetAllSnippets } from "@/Hooks/useGetAllSnippets";
import { Snippet } from "@/types";

const Dashboard = () => {
	const { data, isLoading } = useGetAllSnippets();
	//copy the code above and paste it in the Snippetform.tsx file

	isLoading && <div>Loading...</div>;

	return (
		<div className="grid md:grid-cols-2 gap-5 grid-cols-1 ">
			{data?.map((snippet: Snippet) => (
				<Card key={snippet.id} snippet={snippet} />
			))}
			<Snippetform type="create" />
		</div>
	);
};

export default Dashboard;
