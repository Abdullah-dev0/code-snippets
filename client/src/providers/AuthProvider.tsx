import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
	const { data, isLoading, isError } = useCurrentUser();

	if (isError) {
		return <div className="text-center">An error occurred</div>; // You can replace this with an error component
	}

	if (isLoading) {
		return <div className="text-center">Loading...</div>; // You can replace this with a loader/spinner
	}

	if (!data?.user) {
		return <Navigate to="auth/sign-up" />;
	}

	if (data?.user.emailVerified === false) {
		return <Navigate to="/Otp-verification" />;
	}

	return <Outlet />;
};

export default AuthProvider;
