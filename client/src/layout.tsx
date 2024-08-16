import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Sidebar from "./components/Sidebar";

const Layout = () => {
	return (
		<>
			<div className="flex">
				<Sidebar />
				<main className="p-4">
					<Navbar />
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default Layout;
