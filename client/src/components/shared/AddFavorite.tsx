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
			setHeartColor(true);
			const response = await axios.post("/api/addfavorite", { snippetId });
			return response.data;
		},
		onSuccess: (response) => {
			if (response.status === 200) {
				toast.success(response.data.message);
			}
			queryClient.invalidateQueries({
				queryKey: ["getFavoritesSnippets"],
			});
		},
		onError: ({ message }) => {
			setHeartColor(false);
			toast.error(message);
		},
	});

	const isFav: Boolean = data?.map((snippet: any) => snippet.id).includes(snippetId);

	console.log(isFav);

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
