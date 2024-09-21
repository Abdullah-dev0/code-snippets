import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<App />
			<Toaster richColors position="top-center" closeButton  duration={3000} />
		</ThemeProvider>
	</QueryClientProvider>,
);
