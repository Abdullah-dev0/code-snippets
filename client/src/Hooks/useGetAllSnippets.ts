import { Snippet } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllSnippets = () => {
	const { isLoading, isError, data, error } = useQuery<Snippet[]>({
		queryKey: ["GetAllSnippets"],
		queryFn: async () => {
			try {
				const response = await axios.get("/api/getsnippets");
				return response.data; // Return the data here
			} catch (error: any) {
				throw error;
			}
		},

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

	return { isLoading, isError, data, error };
};
