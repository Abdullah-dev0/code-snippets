import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useCurrentUser = () => {
	const { isLoading, isError, data, error, isFetching } = useQuery<User>({
		queryKey: ["currentUser"],
		queryFn: async () => {
			try {
				const response = await axios.get("/api/getCurrentUser");
				return response.data;
			} catch (error: any) {
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 401) {
						toast.error("Please login to continue.");
						throw new Error("Unauthorized");
					} else {
						toast.error("An unexpected error occurred. Please try again.");
					}
				}
			}
		},
		staleTime: 1000 * 60 * 15,
		refetchOnWindowFocus: false,
		retry: false,
	});

	const user = data?.user;

	return { isLoading, isError, isFetching, user, error };
};
