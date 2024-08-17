import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
	const { user } = useCurrentUser();

	return (
		<div className="flex justify-between items-center shadow-md p-2 rounded-lg">
			<div className="flex items-center justify-center gap-x-4 text-sm">
				{user?.avatar ? (
					<img src={user.avatar} alt={user.username} className="h-10 w-10 rounded-full" />
				) : (
					<Avatar>
						<AvatarFallback>{user?.username?.[0]}</AvatarFallback>
					</Avatar>
				)}
				<div>
					<h1 className="font-bold">{user?.username}</h1>
					<h1>{user?.email}</h1>
				</div>
			</div>
			<div className="w-56">
				<input type="text" className="w-full" />
			</div>
			<ModeToggle />
		</div>
	);
};

export default Navbar;
