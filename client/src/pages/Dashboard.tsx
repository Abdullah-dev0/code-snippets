import { useCurrentUser } from "@/Hooks/useCurrentUser";

const Dashboard = () => {
	const { data } = useCurrentUser();
	return (
		<div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident expedita amet quidem vel, nesciunt cupiditate
				blanditiis temporibus perferendis, molestias consequuntur, accusamus tempore. Eveniet!
			</p>

			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default Dashboard;
