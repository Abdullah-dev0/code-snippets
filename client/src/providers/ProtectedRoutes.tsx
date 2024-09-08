import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	const { user, isLoading, isFetching } = useCurrentUser();

	// Show loading state when fetching the user data
	if (isLoading || isFetching) {
		return <div className="text-center">Loading...</div>;
	}

	if (user && user.emailVerified) {
		return <Navigate to="/dashboard" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoutes;
