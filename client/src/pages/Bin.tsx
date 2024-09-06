import { useGetBinSnippets } from "@/Hooks/useGetAllBinSnippets";

export const Bin = () => {
	const { isLoading, isError, data } = useGetBinSnippets();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error...</div>;
	}

	if (!data || data.length === 0) {
		return <div>No snippets in Bin</div>;
	}

	return (
		<div>
			{data.map((snippet) => (
				<div key={snippet.id}>
					<pre>{JSON.stringify(snippet, null, 2)}</pre>
				</div>
			))}
		</div>
	);
};
