import { SeatTypeEnum } from "@/services/api/cart";
import { MyReservationItemType } from "@/services/api/reservations";
import { Box, Card, Typography } from "@mui/material";
import { useRef } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import QrCode2Icon from "@mui/icons-material/QrCode2";
import ModalCustom from "../shared/Modal";
import ViewMySeats from "./ViewMySeats";

import BaseButton from "../shared/buttons/BaseButton";

const useStyles = () => ({
	card: (theme: any) => ({
		minHeight: 50,
		borderRadius: "8px",
		backgroundColor: theme.palette.background.light,
		backgroundImage: "none",
		position: "relative",
		padding: "0.5rem",
	}),
});

function MyReservation({
	reservation,
}: {
	reservation: MyReservationItemType;
}) {
	const refModal = useRef<any>();
	const styles = useStyles();
	return (
		<>
			<Card sx={styles.card}>
				<Box
					sx={{
						position: "absolute",
						top: "8px",
						right: "8px",
						minWidth: "0",
						borderRadius: "10px",
						padding: "5px",
						border: "1px solid",
					}}
				>
					<Typography variant="body2" fontSize="12px">
						{reservation.status.toUpperCase()}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: "7px",
						alignItems: "center",
					}}
				>
					<Box>
						<QrCode2Icon fontSize="large" />
					</Box>

					<Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								gap: "1px",
								alignItems: "center",
							}}
						>
							<MyLocationIcon color="primary" fontSize="inherit" />
							<Typography variant="h6" fontSize="13px">
								Destination: {reservation.itinerary.destination}
							</Typography>
						</Box>

						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								gap: "1.3px",
								alignItems: "center",
							}}
						>
							<PlaceIcon color="primary" fontSize="inherit" />
							<Typography variant="h6" fontSize="13px">
								Origin: {reservation.itinerary.origin}
							</Typography>
						</Box>
					</Box>
				</Box>
				<Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: "1.3px",
							alignItems: "center",
						}}
					>
						<CalendarMonthIcon color="primary" fontSize="inherit" />
						<Typography variant="h6" fontSize="13px">
							Opening Time:{" "}
							{new Date(reservation.itinerary.openingTime).toLocaleDateString(
								"PE"
							)}{" "}
							-{" "}
							{new Date(reservation.itinerary.openingTime).toLocaleTimeString(
								"PE"
							)}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: "1.3px",
							alignItems: "center",
						}}
					>
						<CalendarMonthIcon color="primary" fontSize="inherit" />
						<Typography variant="h6" fontSize="13px">
							Closing Time:{" "}
							{new Date(reservation.itinerary.closingTime).toLocaleDateString(
								"PE"
							)}{" "}
							-{" "}
							{new Date(reservation.itinerary.closingTime).toLocaleTimeString(
								"PE"
							)}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: "2px",
						}}
					>
						<ConfirmationNumberIcon color="primary" fontSize="inherit" />
						<Typography variant="h6" fontSize="13px">
							Ticket ID:{" "}
						</Typography>
						<Typography variant="h6" fontSize="13px" color="primary">
							{reservation.ticketId}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: "1.3px",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: "1.3px",
							alignItems: "center",
						}}
					>
						<Typography color="#cccc" variant="h6" fontSize="11px">
							Date of purchase:{" "}
							{new Date(reservation.itinerary.closingTime).toLocaleDateString(
								"PE"
							)}
						</Typography>
					</Box>
					{/* <Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: "2px",
					}}
				>
					<EventSeatIcon color="primary" fontSize="inherit" />
					<Typography variant="h6" fontSize="13px">
						Quantity: {reservation.quantity}
					</Typography>
				</Box> */}
					<BaseButton
						variant="contained"
						color="primary"
						sx={{
							padding: "5px 10px",
						}}
						disabled={false}
						onClick={() => refModal.current.handleOpen()}
					>
						View Seats
					</BaseButton>
				</Box>
			</Card>
			<ModalCustom ref={refModal}>
				<ViewMySeats
					defaultSeats={reservation.itinerary.seats}
					mySeats={reservation.seats}
				/>
			</ModalCustom>
		</>
	);
}

export default MyReservation;
