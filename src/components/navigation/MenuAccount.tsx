import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";
import { useAuthStore, ActionType } from "@/context/AuthStore";
const ModalContent = styled(Box)(({ theme }) => ({
	top: "calc(50vh - 100px)",
	margin: "auto",
	position: "relative",
	width: "20%",
	overflowY: "auto",
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[5],
	outline: "none",
	padding: theme.spacing(2),
	textAlign: "center",
}));

const ModalButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(1),
	marginLeft: 0,
	marginBottom: 0,
}));

const useStyles = () => ({
	modal: (theme: any) => ({
		top: "calc(50vh - 100px)",
		margin: "auto",
		position: "relative",
		width: "20%",
		overflowY: "auto",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		outline: "none",
		padding: theme.spacing(2),
	}),
	button: (theme: any) => ({
		margin: theme.spacing(1),
		marginLeft: 0,
		marginBottom: 0,
	}),
	centeredModal: {
		justifyContent: "center",
		alignItems: "center",
	},
	centeredBox: {
		display: "flex",
		justifyContent: "center",
	},
});

function MenuAccount({ onClose, anchorEl }: { onClose: any; anchorEl: any }) {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { dispatch, state } = useAuthStore();
	const styles = useStyles();
	const handleClose = () => {
		setOpen(false);

		onClose();
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleLogOut = () => {
		dispatch({
			type: ActionType.LOGOUT,
		});
		router.push("/auth/signin");
	};

	return (
		<>
			<Modal open={open} sx={styles.centeredModal}>
				<ModalContent
					sx={{
						borderRadius: "20px",
					}}
				>
					<Typography color="#fff" data-testid="lblSignOutModal">
						Are you sure you want to sign out?
					</Typography>
					<Box sx={styles.centeredBox}>
						<ModalButton
							onClick={handleLogOut}
							variant="outlined"
							data-testid="btnSignOutModalYes"
						>
							<Typography>Yes</Typography>
						</ModalButton>
						<ModalButton
							onClick={handleClose}
							variant="outlined"
							data-testid="btnSignOutModalNo"
						>
							<Typography>No</Typography>
						</ModalButton>
					</Box>
				</ModalContent>
			</Modal>
			<Menu
				id="menu-signout"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				sx={{
					marginLeft: "40px",
				}}
				onClose={handleClose}
			>
				{state.user?.role === "onroad" && (
					<>
						<MenuItem
							onClick={() => router.push("/panel/operators")}
							data-testid="btnSignOutSubMenu"
						>
							<Typography variant="body2">Admin panel</Typography>
						</MenuItem>
					</>
				)}

				<MenuItem
					onClick={() => router.push("/my-reservations")}
					data-testid="btnSignOutSubMenu"
				>
					<Typography variant="body2">My reservations</Typography>
				</MenuItem>
				<MenuItem onClick={handleOpen} data-testid="btnSignOutSubMenu">
					<Typography variant="body2">Sign Out</Typography>
				</MenuItem>
			</Menu>
		</>
	);
}

export default MenuAccount;
