import { Box, Modal, styled } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const ModalContent = styled(Box)(({ theme }) => ({
	margin: "auto",
	position: "relative",
	width: "100%",
	maxWidth: "800px",
	top: "15px",
	overflowY: "auto",
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[5],
	outline: "none",
	padding: theme.spacing(2),
	textAlign: "center",
}));

const ModalCustom = forwardRef(function M(
	{ children }: { children: React.ReactNode },
	ref
) {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	useImperativeHandle(ref, () => ({
		handleOpen: () => {
			setOpen(true);
		},
	}));

	return (
		<Modal
			BackdropProps={{
				onClick: handleClose, // This handles clicking outside the modal content to close it
			}}
			onClose={handleClose}
			sx={{
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
			open={open}
		>
			<ModalContent
				sx={{
					borderRadius: "20px",
					color: "#fff",
				}}
			>
				{children}
			</ModalContent>
		</Modal>
	);
});

export default ModalCustom;
