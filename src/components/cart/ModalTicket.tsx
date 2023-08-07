import { forwardRef, useState, useImperativeHandle, useRef } from "react";
import { Box, Modal, Typography, styled } from "@mui/material";
import { ItinerarieType } from "@/services/api/itineraries";

import { CartType, useAddItem } from "@/services/api/cart";
import Image from "next/image";
import { motion } from "framer-motion";
import BaseButton from "../shared/buttons/BaseButton";
import { calculatePrice } from "@/utils/calculatePrice";
import SettingSeats from "../forms/buses/SettingSeats";
import { useQueryClient } from "@tanstack/react-query";

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

const useStyles = () => ({
	containerSeats: (theme: any) => ({
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
		gap: "20px",
	}),

	title: (theme: any) => ({
		color: theme.palette.primary.main,
		fontWeight: "bold",
		marginY: "20px",
		marginX: "auto",
		fontSize: "20px",
	}),
	containerQuantity: {
		marginTop: "20px",
		width: "100%",
		maxWidth: "300px",
		marginX: "auto",
	},
	imageContainer: {
		width: "100%",
		justifyContent: "center",
		display: "flex",
		marginX: "auto",
	},
	buttonsContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "20px",
		width: "100%",
		marginTop: "20px",
	},
});

const ModalTicket = forwardRef(function ModalF(
	{ itinerarieSelected }: { itinerarieSelected: ItinerarieType | null },
	ref
) {
	const [confirm, setConfirm] = useState(false);
	const styles = useStyles();
	const { mutate, isLoading } = useAddItem();
	const [open, setOpen] = useState(false);

	useImperativeHandle(ref, () => ({
		handleOpen() {
			setOpen(true);
		},
	}));
	const handleClose = () => {
		setOpen(false);
		refSeats.current = null;
		setConfirm(false);
	};

	const client = useQueryClient();

	const cart = client.getQueryData(["cart"]) as CartType | undefined;

	const refSeats = useRef() as any;

	const handleAddItem = () => {
		if (!itinerarieSelected) return;
		if (!refSeats.current) return;
		const seats = refSeats.current.map((s: number) => ({
			number: s,
			type: itinerarieSelected?.seats.find((seat) => seat.number === s)?.type,
		}));
		if (seats.length === 0) return;
		mutate({
			itemId: itinerarieSelected?.id,
			seats,
		});
		refSeats.current = null;
		setConfirm(false);
		setOpen(false);
	};

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
				<Typography sx={styles.title}>
					Select the type of seat you want to buy
				</Typography>
				{itinerarieSelected && (
					<Box>
						<motion.div
							initial={{ opacity: 0, scale: 0.5, x: 100 }}
							animate={{ opacity: 1, scale: 1, x: 0 }}
							transition={{ duration: 1 }}
							layoutId={itinerarieSelected.id.toString()}
						>
							<Box sx={styles.imageContainer}>
								<Image
									src={itinerarieSelected.bus.imageUrl}
									width={200}
									height={200}
									className="rounded-lg"
									alt="Bus Onroad"
								/>
							</Box>
						</motion.div>
						<SettingSeats
							confirm={confirm}
							capacity={itinerarieSelected.seats.length}
							cartItems={cart && cart.items}
							itinerarieId={itinerarieSelected.id}
							defaultSeats={itinerarieSelected.seats}
							refSeats={refSeats}
							porcentageIncreaseSeatType={
								itinerarieSelected.bus.porcentageIncreaseSeatType
							}
							basePrice={+itinerarieSelected.baseTicketPrice}
						/>

						{confirm ? (
							<Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "flex-end",
										maxWidth: "300px",
										marginX: "auto",
										marginTop: "10px",
									}}
								>
									<Typography
										sx={{
											fontSize: "14px",
											color: "#ccc",
										}}
										variant="h6"
									>
										Total: $
										{refSeats.current &&
											refSeats.current
												.map((s: number) => ({
													type: itinerarieSelected?.seats.find(
														(seat) => seat.number === s
													)?.type,
												}))
												.reduce(
													(acc: number, item: any) =>
														acc +
														+calculatePrice(
															+itinerarieSelected.baseTicketPrice,
															item.type,
															itinerarieSelected.bus.porcentageIncreaseSeatType
														),
													0
												)
												.toFixed(2)}
									</Typography>
								</Box>
								<Box sx={styles.buttonsContainer}>
									<BaseButton
										color="warning"
										sx={{
											width: "40%",
											padding: "10px",
										}}
										disabled={false}
										onClick={() => {
											setConfirm(false);
											refSeats.current = null;
										}}
										variant="outlined"
									>
										Cancel
									</BaseButton>
									<BaseButton
										color="primary"
										sx={{
											width: "40%",
											padding: "10px",
										}}
										disabled={isLoading}
										onClick={handleAddItem}
										variant="contained"
									>
										Add to cart
									</BaseButton>
								</Box>
							</Box>
						) : (
							<Box>
								<BaseButton
									color="primary"
									sx={{
										marginTop: "20px",
										width: "40%",
										padding: "10px",
									}}
									disabled={false}
									onClick={() => {
										setConfirm(true);
									}}
									variant="outlined"
								>
									Confirm
								</BaseButton>
							</Box>
						)}
					</Box>
				)}
			</ModalContent>
		</Modal>
	);
});

export default ModalTicket;
