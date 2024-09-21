import { debounce } from "@/lib/utils";
import { Input } from "../ui/input";

const SearchSnippet = ({ setSearchTerm }: { setSearchTerm: (value: string) => void }) => {
	const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	}, 600);

	return (
		<div>
			<Input
				className="max-w-lg mx-auto"
				placeholder="Search snippets"
				onChange={handleSearchChange} // Trigger search on input change
			/>
		</div>
	);
};

export default SearchSnippet;
