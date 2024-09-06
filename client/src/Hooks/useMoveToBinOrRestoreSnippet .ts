import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useMoveToBinOrRestoreSnippet = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ snippetId, action }: { snippetId: string; action: "delete" | "restore" }) => {
			const response = await axios.put("/api/snippet/action", { snippetId, action });
			return response.data;
		},
		onSuccess: async ({ action }) => {
			// const message = action === "delete" ? "Snippet moved to Bin successfully." : "Snippet restored successfully.";

			await queryClient.refetchQueries({ queryKey: ["BinSnippets"], type: "active" });

			queryClient.invalidateQueries({ queryKey: ["BinSnippets"], type: "active" });

			await queryClient.refetchQueries({ queryKey: ["GetAllSnippets"], type: "active" });
			// toast.success(message);
		},
		onError: () => {
			toast.error("Failed to perform action. Please try again.");
		},
	});

	return { mutation };
};
