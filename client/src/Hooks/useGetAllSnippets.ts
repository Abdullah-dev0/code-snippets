import { Snippet } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useGetAllSnippets = () => {
	const { isLoading, isError, data, error } = useQuery<Snippet[]>({
		queryKey: ["GetAllSnippets"],

		queryFn: async () => {
			try {
				const response = await axios.get(`/api/getsnippets?deleted=${false}`);
				return response.data;
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
		gcTime: 1000 * 60 * 60,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: (failureCount, error: any) => {
			if (error?.response?.status === 401) {
				return false;
			}
			return failureCount < 1;
		},
		retryDelay: 2000,
	});

	return { isLoading, isError, data, error };
};
