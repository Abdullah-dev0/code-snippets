import { navLinks } from "@/constants";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";

const Sidebar = () => {
	return (
		<aside className="min-w-60  fixed left-0 h-screen shadow-lg dark:shadow-slate-900 hidden lg:block">
			<div className="flex justify-center items-center gap-3 p-5 mt-5">
				<img src="/logo.png" width={40} height={40} alt="SnippetNest Logo" />

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
				<Logout />
			</div>
		</aside>
	);
};

export default Sidebar;
