import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "@/layout.tsx";
import { InputOTPForm } from "@/pages/InputOTPForm";
import HomePage from "@/pages/Home.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Signup from "@/pages/Signup.tsx";
import AuthProvider from "./providers/AuthProvider";
import Favorites from "@/pages/Favorites";

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route element={<AuthProvider />}>
					<Route element={<Layout />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="favorites" element={<Favorites />} />
					</Route>
				</Route>
				<Route path="Otp-verification" element={<InputOTPForm />} />
				<Route path="auth/sign-up" element={<Signup />} />
				<Route path="*" element={<div>404</div>} />
			</Routes>
		</Router>
	);
};
