import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StyledThemeProvider from "../theme/StyledThemeProvider";
import AuthStore from "@/context/AuthStore";

function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<AuthStore>
				<StyledThemeProvider>{children}</StyledThemeProvider>
			</AuthStore>
		</QueryClientProvider>
	);
}

export default Providers;
