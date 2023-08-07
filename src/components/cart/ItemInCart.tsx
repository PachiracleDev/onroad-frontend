import { CartItemType, SeatTypeEnum, useRemoveItem } from "@/services/api/cart";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";

import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import CloseIcon from "@mui/icons-material/Close";
import { calculatePrice } from "@/utils/calculatePrice";
const useStyles = () => ({
	card: (theme: any) => ({
		minHeight: 50,
		borderRadius: "8px",
		backgroundColor: theme.palette.background.light,
		backgroundImage: "none",
		position: "relative",
		padding: "0.5rem",
		gap: "2px",
		flexDirection: "column",
		display: "flex",
	}),
});

function ItemInCart({ item }: { item: CartItemType }) {
	const { mutate, isLoading } = useRemoveItem(item.id);
	const styles = useStyles();

	return (
		<Card sx={styles.card}>
			<Button
				sx={{
					position: "absolute",
					top: "8px",
					right: "8px",
					minWidth: "0",
					borderRadius: "50%",
					padding: "5px",
				}}
				onClick={() => mutate(item.id)}
				disabled={isLoading}
			>
				{isLoading ? (
					<CircularProgress size={20} />
				) : (
					<CloseIcon color="warning" fontSize="small" />
				)}
			</Button>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					gap: "7px",
					alignItems: "center",
				}}
			>
				<Box>
					<AirlineSeatReclineNormalIcon color="primary" fontSize="large" />
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
							Destination: {item.itinerarie.destination}
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
							Origin: {item.itinerarie.origin}
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
						{new Date(item.itinerarie.openingTime).toLocaleDateString("PE")}-{" "}
						{new Date(item.itinerarie.closingTime).toLocaleTimeString("PE")}
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
						{new Date(item.itinerarie.closingTime).toLocaleDateString("PE")}-{" "}
						{new Date(item.itinerarie.closingTime).toLocaleTimeString("PE")}
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
						alignItems: "center",
					}}
				>
					<AttachMoneyIcon color="primary" fontSize="inherit" />
					<Typography variant="h6" fontSize="13px">
						Subtotal: $
						{item.seats
							.map(
								(seat) =>
									+calculatePrice(
										+item.itinerarie.baseTicketPrice,
										seat.type,
										item.itinerarie.porcentageIncreaseSeatType
									)
							)
							.reduce((acc, item) => acc + item, 0)
							.toFixed(2)}
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
					<EventSeatIcon color="primary" fontSize="inherit" />
					<Typography variant="h6" fontSize="13px">
						Quantity: {item.seats.length}
					</Typography>
				</Box>
			</Box>
		</Card>
	);
}

export default ItemInCart;
