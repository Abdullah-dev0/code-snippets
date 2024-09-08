import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<App />
			<ReactQueryDevtools initialIsOpen={false} />
			<Toaster richColors position="top-center" duration={4000} />
		</ThemeProvider>
	</QueryClientProvider>,
);
