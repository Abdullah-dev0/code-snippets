import { Card } from "@/components/shared/Card";
import { Button } from "@/components/ui/button";
import { useGetBinSnippets } from "@/Hooks/useGetAllSnippets";
import { Snippet } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const Bin = () => {
	const queryClient = useQueryClient();
	const { data, isLoading, isFetching } = useGetBinSnippets();

	// Make sure this hook is declared before any returns
	const mutation = useMutation({
		mutationFn: async () => {
			const response = await axios.delete("/api/emptybin");
			return response.data;
		},
		onSuccess: () => {
			toast.success("Bin emptied successfully.");
			queryClient.invalidateQueries({
				queryKey: ["binSnippets"],
			});
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data.error);
				}
			} else {
				toast.error("An unexpected error occurred. Please try again.");
			}
		},
	});

	if (isLoading || isFetching) {
		return <div className="text-red text-4xl">Loading...</div>;
	}

	if (mutation.isPending) {
		return (
			<div className="text-red text-4xl h-screen w-full bg-slate-600 z-50 grid place-content-center">Emptying...</div>
		);
	}

	return (
		<>
			<div className="text-end">
				<Button disabled={data?.length === 0} onClick={() => mutation.mutate()} variant={"destructive"}>
					Empty Bin
				</Button>
			</div>

			{data?.length === 0 ? (
				<div className="text-4xl">No snippets found.</div>
			) : (
				<div className="grid lg:grid-cols-2 gap-5 grid-cols-1">
					{data?.map((snippet: Snippet) => (
						<Card type="bin" key={snippet.id} snippet={snippet} />
					))}
				</div>
			)}
		</>
	);
};
