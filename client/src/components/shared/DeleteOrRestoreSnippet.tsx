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
import { useMoveToBinOrRestoreSnippet } from "@/Hooks/useMoveToBinOrRestoreSnippet ";
import { Trash2 } from "lucide-react";

interface DeleteOrRestoreSnippetProps {
	id: string;
}

const DeleteOrRestoreSnippet = ({ id }: DeleteOrRestoreSnippetProps) => {
	const { mutation } = useMoveToBinOrRestoreSnippet();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Trash2 className="cursor-pointer" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>Move To Trash?</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							mutation.mutate({ snippetId: id, action: "delete" });
						}}>
						Move to Trash
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteOrRestoreSnippet;
