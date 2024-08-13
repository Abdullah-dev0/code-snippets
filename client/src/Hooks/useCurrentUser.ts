import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrentUser = () => {
	const { isLoading, isError, data, error } = useQuery({
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
		refetchOnMount: false, // Disable refetch on mount
		refetchInterval: false, // Disable regular interval refetch
		retry: 1, // Number of retries on failure
		retryDelay: 5000, // Delay between retries
	});

	return { isLoading, isError, data, error };
};
