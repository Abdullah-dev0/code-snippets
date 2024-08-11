import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "@/layout.tsx";
import { InputOTPForm } from "@/pages/InputOTPForm";
import HomePage from "@/pages/Home.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Signup from "@/pages/Signup.tsx";

export const App = () => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="auth/signin" element={<HomePage />} />
					<Route path="auth/signup" element={<Signup />} />
					<Route path="/email-verification" element={<InputOTPForm />} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path="*" element={<div>404</div>} />
				</Routes>
			</Layout>
		</Router>
	);
};
