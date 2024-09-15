import { Card } from "@/components/shared/Card";
import { useGetFavSnippet } from "@/Hooks/useGetFavSnippet";
import { Snippet } from "@/types";

const Favorites = () => {
	const { data, isFetching, isLoading } = useGetFavSnippet();

	if (isFetching || isLoading) {
		return <div className="text-red text-4xl">Loading...</div>;
	}

	if (data?.length === 0 || !data) return <div className="text-red text-4xl">No favorites found.</div>;

	return (
		<div className="grid lg:grid-cols-2 gap-5 grid-cols-1">
			{data?.map((Snippet: Snippet) => (
				<Card type="dashboard" key={Snippet.id} snippet={Snippet} />
			))}
		</div>
	);
};

export default Favorites;
