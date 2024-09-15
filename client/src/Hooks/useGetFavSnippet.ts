import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
export const useGetFavSnippet = () => {
	const { data, isFetching, isLoading, isRefetching } = useQuery<any>({
		queryKey: ["getFavoritesSnippets"],
		queryFn: async () => {
			try {
				const response = await axios.get("/api/getfavorites");

				return response.data;
			} catch (error) {
				if (axios.isAxiosError(error)) {
					toast.error(error.response?.data.error);
					throw error.response?.data;
				} else {
					toast.error("An error occurred. Please try again.");
					throw error;
				}
			}
		},
		staleTime: 1000 * 60 * 15,
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

	return { data, isFetching, isLoading, isRefetching };
};
