import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
	const { user, isLoading } = useCurrentUser();

	if (isLoading) {
		return <div className="text-center">Loading...</div>; // You can replace this with a loader/spinner
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
