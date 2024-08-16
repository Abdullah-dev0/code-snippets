import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrentUser = () => {
	const { isLoading, isError, data } = useQuery({
		queryKey: ["currentUser"],
		queryFn: async () => {
			try {
				const response = await axios.get("/api/getCurrentUser");
				return response.data; // Return the data here
			} catch (error: any) {
				console.log(error);
				throw error; // Rethrow the error so React Query can handle it
			}
		},
		staleTime: 1000 * 60 * 10, // Data will be considered fresh for 10 minutes
		gcTime: 1000 * 60 * 60, // Garbage collection after 1 hour
		refetchOnMount: false, // Disable refetch on mount
		refetchOnWindowFocus: false,
		retry: (failureCount, error: any) => {
			if (error?.response?.status === 401) {
				return false;
			}
			return failureCount < 2;
		},
		retryDelay: 2000, // Delay between retries
	});

	return { isLoading, isError, data };
};
