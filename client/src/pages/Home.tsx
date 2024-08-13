import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import axios from "axios";

const HomePage = () => {
	const { data } = useCurrentUser();

	console.log(data);

	const onSubmit = async () => {
		const response = await axios.post("/api/add", {
			message: "hey my im abdullah ",
		});

		console.log(response);
	};
	return (
		<div>
			<Button>Sign In</Button>

			<Link to="/auth/sign-up">
				<Button>Sign Up</Button>
			</Link>
			<div>
				<button onClick={onSubmit}>add</button>
			</div>
		</div>
	);
};

export default HomePage;
