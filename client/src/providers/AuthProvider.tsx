import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
	const { user, isLoading, isError, isFetching } = useCurrentUser();

	console.log(user, "user in AuthProvider");

	if (isLoading || isFetching) {
		return <div className="text-center">Loading...</div>;
	}

	if (isError) {
		return <Navigate to="auth" replace />;
	}

	if (!user) {
		return <Navigate to="auth" replace />;
	}

	if (user.emailVerified === false) {
		return <Navigate to="Otp-verification" />;
	}

	return <Outlet />;
};

export default AuthProvider;
