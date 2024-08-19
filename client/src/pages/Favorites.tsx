import { useCurrentUser } from "@/Hooks/useCurrentUser";

const Favorites = () => {
	const { user } = useCurrentUser();
	return (
		<div className="mt-7 w-full">
			faviorites
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
};

export default Favorites;
