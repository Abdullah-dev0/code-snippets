import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const HomePage = () => {
	return (
		<div>
			<Button>Sign In</Button>

			<Link to="auth">
				<Button>Sign Up</Button>
			</Link>

			<Link to="/Dashboard">
				<Button>Dashboard</Button>
			</Link>
		</div>
	);
};

export default HomePage;
