import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useInterval } from "@/Hooks/useInterval";
import { useCallback, useState } from "react";

const HomePage = () => {
	const [count, setCount] = useState(0);

	useInterval(
		useCallback(() => {
			setCount((count) => count + 1);
		}, []),
		1500,
	);

	console.log("HomePage rendered");
	return (
		<div>
			<Button>Sign In</Button>

			<Link to="/auth/sign-up">
				<Button>Sign Up</Button>
			</Link>

			<p>{count} seconds have elapsed since the component was mounted.</p>
		</div>
	);
};

export default HomePage;
