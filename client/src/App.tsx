import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layout.tsx";
import EmailVerification from "./pages/EmailVerification.tsx";
import HomePage from "./pages/Home.tsx";

export const App = () => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/email-verification" element={<EmailVerification />} />
				</Routes>
			</Layout>
		</Router>
	);
};
