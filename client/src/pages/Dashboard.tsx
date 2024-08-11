import { useCurrentUser } from "../Hooks/useCurrentUser";

const Dashboard = () => {
	const { data, isLoading, isError } = useCurrentUser();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {isError}</div>;
	}

	console.log(data);
	return (
		<div>
			<h1 className="text-center">Dashboard</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolorum fugit impedit.</p>
		</div>
	);
};

export default Dashboard;
