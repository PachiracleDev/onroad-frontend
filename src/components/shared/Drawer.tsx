import React from "react";

import Drawer from "@mui/material/Drawer";

const useStyles = ({ width, height, isMain }: any) => ({
	root: {
		flexShrink: 0,
	},
	drawerPaper: (theme: any) => ({
		zIndex: theme.zIndex.drawer - (isMain ? 0 : 1),
		[theme.breakpoints.up("sm")]: {
			width: width,
			height: height,
		},
		[theme.breakpoints.down("xs")]: {
			width: "100vw",
			height: "100vh",
		},
		overflowX: "hidden",
	}),
});

const DrawerCustom = ({
	height = "100vh",
	width = "360px",
	isMain = false,
	variant = "persistent",
	anchor = "left",
	children,
	onClose,
	load = false,
	open = true,
}: {
	height?: string;
	width?: string;
	isMain?: boolean;
	variant?: "permanent" | "persistent" | "temporary";
	anchor?: "left" | "right" | "top" | "bottom";
	children: React.ReactNode;
	onClose: () => void;
	open?: boolean;
	load?: boolean;
}) => {
	const styles = useStyles({ width, height, isMain });

	return (
		<>
			<Drawer
				variant={variant}
				anchor={anchor}
				PaperProps={{
					sx: styles.drawerPaper,
				}}
				onClose={onClose}
				open={open}
				sx={styles.root}
			>
				{(open || load) && children}
			</Drawer>
		</>
	);
};

export default DrawerCustom;
