// AuthProvider.tsx
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
	const { user, isLoading, isError, isFetching } = useCurrentUser();

	if (isLoading || isFetching) {
		return <div className="text-center">Loading...</div>;
	}

	if (isError || !user) {
		return <Navigate to="/auth" replace />;
	}

	if (user && !user.emailVerified) {
		return <Navigate to="/Otp-verification" replace />;
	}

	return <Outlet />;
};

export default AuthProvider;
