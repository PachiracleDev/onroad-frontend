import React from "react";
import SideBar from "../components/navigation/SideBar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const LayoutContainer = styled(Box)({
	width: "100vw",
	height: "100vh",
	overflow: "hidden",
});

function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<LayoutContainer>
			{router.pathname.includes("panel") && (
				<Box component="nav">
					<SideBar />
				</Box>
			)}
			{children}
			<ReactQueryDevtools position="bottom-right" />
		</LayoutContainer>
	);
}

export default Layout;
