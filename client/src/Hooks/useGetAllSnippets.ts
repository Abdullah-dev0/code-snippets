import { Snippet } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useGetAllSnippets = (searchTerm: string) => {
	console.log(searchTerm);
	const { isLoading, data, isFetching } = useQuery<Snippet[]>({
		queryKey: ["GetAllSnippets", searchTerm],
		placeholderData: keepPreviousData,
		queryFn: async () => {
			try {
				const response = await axios.get(`/api/getsnippets?deleted=${false}&search=${searchTerm}`);
				return response.data;
			} catch (error: any) {
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 401) {
						throw new Error("Unauthorized");
					} else {
						toast.error("An unexpected error occurred. Please try again.");
					}
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

	return { isLoading, data, isFetching };
};

export const useGetBinSnippets = () => {
	const { isLoading, isError, data, isFetching } = useQuery<Snippet[]>({
		queryKey: ["binSnippets"],

		queryFn: async () => {
			try {
				const response = await axios.get(`/api/getsnippets?deleted=${true}`);
				return response.data;
			} catch (error: any) {
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 401) {
						throw new Error("Unauthorized");
					} else {
						toast.error("An unexpected error occurred. Please try again.");
					}
				}
			}
		},

		staleTime: 1000 * 60 * 10,
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

	return { isLoading, isError, data, isFetching };
};
