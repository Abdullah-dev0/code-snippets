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
import { ArchiveRestore, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteOrRestoreSnippetProps {
	id: string;
	type?: "bin" | "restore";
}

const DeleteOrRestoreSnippet = ({ id, type }: DeleteOrRestoreSnippetProps) => {
	const { mutation } = useMoveToBinOrRestoreSnippet();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const handleAction = () => {
		setLoading(true);
		mutation.mutate(
			{ snippetId: id, action: type === "restore" ? "restore" : "delete" },
			{
				onSettled: () => {
					setLoading(false);
					setOpen(false);
				},
			},
		);
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				{type === "bin" ? (
					<Trash2 className="cursor-pointer text-red-800  hover:animate-pulse" />
				) : (
					<ArchiveRestore className="cursor-pointer" />
				)}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						{type === "restore"
							? "Are you sure you want to restore this snippet?"
							: "Are you sure you want to move this snippet to trash?"}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleAction} disabled={loading}>
						{loading ? "Processing..." : type === "restore" ? "Restore" : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteOrRestoreSnippet;
