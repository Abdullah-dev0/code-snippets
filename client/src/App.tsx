import Layout from "@/layout.tsx";
import Auth from "@/pages/Auth";
import { Bin } from "@/pages/Bin";
import Dashboard from "@/pages/Dashboard.tsx";
import Favorites from "@/pages/Favorites";
import HomePage from "@/pages/Home.tsx";
import { InputOTPForm } from "@/pages/InputOTPForm";
import AuthProvider from "@/providers/AuthProvider";
import ProtectedRoutes from "@/providers/ProtectedRoutes";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route index element={<HomePage />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="auth" element={<Auth />} />
					<Route path="Otp-verification" element={<InputOTPForm />} />
				</Route>
				<Route element={<AuthProvider />}>
					<Route element={<Layout />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="favorites" element={<Favorites />} />
						<Route path="bin" element={<Bin />} />
					</Route>
				</Route>
				<Route path="*" element={<div>404 - Not Found</div>} />
			</Routes>
		</Router>
	);
};
