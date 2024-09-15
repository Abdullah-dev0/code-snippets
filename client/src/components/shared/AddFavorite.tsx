import { useGetFavSnippet } from "@/Hooks/useGetFavSnippet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddFavoriteProps {
	snippetId: string;
}

const AddFavorite = ({ snippetId }: AddFavoriteProps) => {
	const { data } = useGetFavSnippet();
	const queryClient = useQueryClient();
	const [heartColor, setHeartColor] = useState(false);

	const mutation = useMutation({
		mutationFn: async ({ snippetId }: AddFavoriteProps) => {
			const response = await axios.post("/api/addfavorite", { snippetId });
			return { response };
		},
		onMutate: () => {
			setHeartColor(true);
		},
		onSuccess: ({ response }) => {
			if (response.status === 200) {
				toast.success(response.data.message);
				console.log(response);
			}
			queryClient.invalidateQueries({
				queryKey: ["getFavoritesSnippets"],
			});
		},
		onError: (error) => {
			setHeartColor(false);
			if (axios.isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data.error);
				}
			} else {
				toast.error("An unexpected error occurred. Please try again.");
			}
		},
	});

	const isFav: Boolean = data?.map((snippet: any) => snippet.id).includes(snippetId);

	return (
		<Heart
			onClick={() => mutation.mutate({ snippetId })}
			className={clsx("cursor-pointer", {
				"text-red-500 fill-red-800": heartColor || isFav,
			})}
		/>
	);
};

export default AddFavorite;
