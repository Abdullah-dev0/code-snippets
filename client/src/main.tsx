import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<App />
		<Toaster position="top-center" duration={6000} />
	</QueryClientProvider>,
);
