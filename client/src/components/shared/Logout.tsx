import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";

const Logout = () => {
	const Navigate = useNavigate();
	const queryClient = useQueryClient();

	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		try {
			const response = await axios.get("/api/auth/logout");
			if (response.status === 200) {
				toast.success("Logged out successfully");
				queryClient.removeQueries();
				Navigate("/auth", { replace: true });
			}
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data) {
					toast.error(error.response.data.error);
				}
			} else {
				toast.error("An error occurred");
			}
		} finally {
			setLoading(false);
		}
	};
	return (
		<Button
			variant={"ghost"}
			onClick={handleLogout}
			disabled={loading}
			className="flex gap-4 hover:bg-purple-700 w-full justify-start p-6 text-xl items-center">
			<img src="/logout.svg" className="h-6 w-6 dark:invert" alt="logout" />
			{loading ? "Logging out..." : "Logout"}
		</Button>
	);
};

export default Logout;
