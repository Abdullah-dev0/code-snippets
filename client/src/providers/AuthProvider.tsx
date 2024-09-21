// AuthProvider.tsx
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
	const { user, isLoading, isError, isFetching } = useCurrentUser();

	if (isLoading || isFetching) {
		return (
			<div className="text-center grid place-content-center h-screen">
				<Loader2 className="animate-spin" />
			</div>
		);
	}
	console.log(user);

	if (isError || !user) {
		return <Navigate to="/auth" replace />;
	}

	if (user && user.emailVerified !== true) {
		return <Navigate to="/Otp-verification" replace />;
	}

	return <Outlet />;
};

export default AuthProvider;
