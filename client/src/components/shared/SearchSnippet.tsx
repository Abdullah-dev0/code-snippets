import { Input } from "../ui/input";

const SearchSnippet = ({ setSearchTerm }: { setSearchTerm: (value: string) => void }) => {
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

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
