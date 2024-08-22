import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteSnippetProps {
	id: string;
}

const DeleteSnippet = ({ id }: DeleteSnippetProps) => {
	const queryClient = useQueryClient();
	const onsubmit = async () => {
		// delete snippet
		try {
			const response = await axios.delete(`/api/delete`, {
				data: {
					id,
				},
			});

			if (response.status === 200) {
				toast.success("Snippet deleted successfully");
				queryClient.invalidateQueries({
					queryKey: ["GetAllSnippets"],
				});
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data.error);
				} else {
					toast.error("An unexpected error occurred. Please try again.");
				}
			} else {
				toast.error("An unexpected error occurred. Please try again.");
			}
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Trash2 className="cursor-pointer" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>Move To Trash ?</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onsubmit}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteSnippet;
