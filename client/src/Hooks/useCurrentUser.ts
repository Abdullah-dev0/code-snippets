import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrentUser = () => {
	const { isLoading, isError, data, error } = useQuery<User>({
		queryKey: ["currentUser"],
		queryFn: async () => {
			try {
				const response = await axios.get("/api/getCurrentUser");
				return response.data; // Return the data here
			} catch (error: any) {
				throw error;
			}
		},
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 60,
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
