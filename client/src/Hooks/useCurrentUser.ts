import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useCurrentUser = () => {
	const { isLoading, isError, data, error } = useQuery<User>({
		queryKey: ["currentUser"],
		queryFn: async () => {
			try {
				const response = await axios.get("/api/getCurrentUser");
				return response.data; // Return the data here
			} catch (error: any) {
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 401) {
						toast.error("Please login to continue.");
					} else {
						toast.error("An unexpected error occurred. Please try again.");
					}
				}
			}
		},
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 60, // Garbage collection time
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: (failureCount, error: any) => {
			if (error?.response?.status === 401) {
				return false;
			}
			return failureCount < 1;
		},
		retryDelay: 2000, // Delay between retries
	});

	const user = data?.user;

	return { isLoading, isError, user, error };
};
