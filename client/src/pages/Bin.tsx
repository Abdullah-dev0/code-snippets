import { Card } from "@/components/shared/Card";
import { useGetBinSnippets } from "@/Hooks/useGetAllSnippets";
import { Snippet } from "@/types";

export const Bin = () => {
	const { data, isLoading, isFetching } = useGetBinSnippets();

	if (isLoading || isFetching) {
		return <div className="text-red text-4xl">Loading...</div>;
	}

	if (data?.length == 0) return <div className="text-red text-4xl">No snippets found.</div>;
	return (
		<div className="grid lg:grid-cols-2 gap-5 grid-cols-1">
			{data?.map((snippet: Snippet) => (
				<Card type="bin" key={snippet.id} snippet={snippet} />
			))}
		</div>
	);
};
