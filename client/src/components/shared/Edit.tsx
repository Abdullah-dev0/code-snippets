import { Snippet } from "@/types"; // Adjust the import according to your file structure
import Snippetform from "./Snippetform";

const Edit = ({ snippet }: { snippet: Snippet }) => {
	return <Snippetform snippet={snippet} type="update" />;
};

export default Edit;
