import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuAccount from "./MenuAccount";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const useStyles = () => ({
	container: {
		display: "flex",
		alignItems: "center",

		backgroundColor: "#000",
		color: "#fff",

		flexDirection: "column",
		justifyContent: "space-between",
		height: "100vh",
		width: "56px",
		padding: "30px 0",
	},
	titleLogo: {
		fontWeight: "bold",
		fontSize: "20px",
	},
	boxIcons: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		alignItems: "center",
	},
	icon: (theme: any) => ({
		color: theme.palette.primary.main,
		fontSize: "25px",
	}),
});

function Header({ handleOpenCart }: { handleOpenCart: () => void }) {
	const [signOutAnchorEl, setSignOutAnchorEl] = useState(false);
	const handleClose = () => {
		setSignOutAnchorEl(false);
	};

	const styles = useStyles();
	return (
		<Box sx={styles.container}>
			<Link href="/">
				<Box>
					<Typography sx={styles.titleLogo}>OR</Typography>
				</Box>
			</Link>
			<Box sx={styles.boxIcons}>
				<Button onClick={handleOpenCart}>
					<LocalMallIcon sx={styles.icon} />
				</Button>
				<Button
					onClick={() => {
						setSignOutAnchorEl(true);
					}}
				>
					<AccountCircleIcon sx={styles.icon} />
				</Button>
			</Box>

			<MenuAccount anchorEl={signOutAnchorEl} onClose={handleClose} />
		</Box>
	);
}

export default Header;
