import { useCurrentUser } from "@/Hooks/useCurrentUser";

const Favorites = () => {
	const { user } = useCurrentUser();
	return (
		<div className="mt-7 w-full">
			<p></p>
		</div>
	);
};

export default Favorites;
