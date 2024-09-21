import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	const { user, isLoading, isFetching } = useCurrentUser();

	// Show loading state when fetching the user data

	console.log("user in Protected route", user);
	if (isLoading || isFetching) {
		return (
			<div className="text-center grid place-content-center h-screen">
				<Loader2 className="animate-spin" />
			</div>
		);
	}

	if (user && user.emailVerified) {
		return <Navigate to="/dashboard" />;
	}

	return <Outlet />;
};

export default ProtectedRoutes;
