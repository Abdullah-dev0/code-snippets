import { Snippet } from "@/types"; // Adjust the import according to your file structure
import Snippetform from "./Snippetform";

const Edit = ({ snippet }: { snippet: Snippet }) => {
	return (
		<div>
			<Snippetform snippet={snippet} type="update" />
		</div>
	);
};

export default Edit;
