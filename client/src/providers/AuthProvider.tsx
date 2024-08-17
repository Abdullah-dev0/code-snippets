import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
	const { user, isLoading, isError } = useCurrentUser();

	if (isLoading) {
		return <div className="text-center">Loading...</div>; // You can replace this with a loader/spinner
	}

	if (isError) {
		return <div className="text-center">An error occurred</div>;
	}

	if (!user) {
		return <Navigate to="auth/sign-up" />;
	}

	if (user.emailVerified === false) {
		return <Navigate to="Otp-verification" />;
	}

	return <Outlet />;
};

export default AuthProvider;
