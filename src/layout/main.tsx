import CartItems from "@/components/cart/CartItems";
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import DrawerCustom from "@/components/shared/Drawer";
import { Box, styled } from "@mui/material";
import { useState } from "react";

const LayoutContainer = styled(Box)({
	width: "100vw",
	height: "100vh",
	overflow: "hidden",
});
function MainLayout({ children }: { children: React.ReactNode }) {
	const [openCart, setOpenCart] = useState(false);

	return (
		<LayoutContainer>
			<Box component="nav">
				<DrawerCustom
					isMain
					variant="persistent"
					anchor="left"
					width="416px"
					load={true}
					onClose={() => {
						setOpenCart(false);
					}}
					open={openCart}
				>
					<CartItems
						onClose={() => {
							setOpenCart(false);
						}}
					/>
				</DrawerCustom>
				<DrawerCustom
					onClose={() => {}}
					isMain
					variant="persistent"
					anchor="left"
					width="56px"
				>
					<Header
						handleOpenCart={() => {
							setOpenCart(!openCart);
						}}
					/>
				</DrawerCustom>
			</Box>

			<Box
				sx={{
					marginLeft: "56px",
					height: "100vh",
				}}
			>
				{children}
			</Box>
		</LayoutContainer>
	);
}

export default MainLayout;
