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
					<Route path="/auth/sign-up" element={<Signup />} />
					<Route path="/Otp-verification" element={<InputOTPForm />} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path="*" element={<div>404</div>} />
				</Routes>
			</Layout>
		</Router>
	);
};
