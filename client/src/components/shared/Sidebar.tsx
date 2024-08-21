import { navLinks } from "@/constants";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";

const Sidebar = () => {
	const Navigate = useNavigate();
	const handleLogout = async () => {
		try {
			const response = await axios.get("/api/auth/logout");
			if (response.status === 200) {
				toast.success("Logged out successfully");
				Navigate("auth");
			}
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data) {
					toast.error(error.response.data.error);
				}
			} else {
				toast.error("An error occurred");
			}
		}
	};

	return (
		<aside className="min-w-60  fixed left-0 h-screen shadow-lg dark:shadow-slate-900 hidden lg:block">
			<div className="flex justify-center items-center gap-3 p-5 mt-5">
				<NavLink to="/" className="">
					<img src="/src/public/logo.png" width={40} height={40} alt="SnippetNest Logo" />
				</NavLink>
				<h1 className="font-bold text-xl">
					<span className="text-purple-900">Snippet</span> Nest
				</h1>
			</div>

			<ul className="mt-12 space-y-4 p-4 text-slate-800 dark:text-white">
				{navLinks.map((link) => (
					<NavLink
						to={link.Link}
						key={link.title}
						className={({ isActive }) =>
							`flex gap-4 rounded-lg  transition-all duration-300 ${isActive ? "bg-purple-700 text-white" : ""}`
						}>
						<li className="flex gap-4 p-3 text-xl items-center">
							<img src={link.icon} className="h-7 w-7 dark:invert fill-red-900" alt={link.title} />
							{link.title}
						</li>
					</NavLink>
				))}
			</ul>

			<div className="mt-12 w-full p-3">
				<Button
					variant={"ghost"}
					onClick={handleLogout}
					className="flex gap-4 hover:bg-purple-700 w-full justify-start p-6 text-xl items-center">
					<img src="/src/public/logout.svg" className="h-6 w-6 dark:invert" alt="logout" />
					Logout
				</Button>
			</div>
		</aside>
	);
};

export default Sidebar;
