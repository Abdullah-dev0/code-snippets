import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "@/layout.tsx";
import { InputOTPForm } from "@/pages/InputOTPForm";
import HomePage from "@/pages/Home.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Signup from "@/pages/Signup.tsx";
import AuthProvider from "./providers/AuthProvider";

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route element={<AuthProvider />}>
					<Route path="/dashboard" element={<Layout />}>
						<Route index element={<Dashboard />} />
					</Route>
					<Route path="Otp-verification" element={<InputOTPForm />} />
					<Route path="auth/sign-up" element={<Signup />} />
					<Route path="*" element={<div>404</div>} />
				</Route>
			</Routes>
		</Router>
	);
};
