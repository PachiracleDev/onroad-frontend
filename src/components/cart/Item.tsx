import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { ItinerarieType } from "@/services/api/itineraries";
import PlaceIcon from "@mui/icons-material/Place";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { motion } from "framer-motion";

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

function Item({
	itinerarie,
	handleOpenModal,
}: {
	itinerarie: ItinerarieType;
	handleOpenModal: (i: ItinerarieType) => void;
}) {
	const styles = useStyles();
	return (
		<>
			<Card sx={styles.card} key={itinerarie.id}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: "7px",
						alignItems: "center",
					}}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.5, x: 100 }}
						animate={{ opacity: 1, scale: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						layoutId={itinerarie.id.toString()}
					>
						<Box>
							<Image
								alt="Bus Onroad"
								src={itinerarie.bus.imageUrl}
								width={90}
								height={90}
							/>
						</Box>
					</motion.div>

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
								Destination: {itinerarie.destination}
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
								Origin: {itinerarie.origin}
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
							{new Date(itinerarie.openingTime).toLocaleDateString("PE")} -{" "}
							{new Date(itinerarie.openingTime).toLocaleTimeString("PE")}
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
							{new Date(itinerarie.closingTime).toLocaleDateString("PE")} -{" "}
							{new Date(itinerarie.closingTime).toLocaleTimeString("PE")}
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
							gap: "7px",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<AttachMoneyIcon color="primary" fontSize="small" />
							<Typography variant="h6" fontSize="12px">
								Base Price:{" "}
							</Typography>
						</Box>

						<Typography variant="h6" fontSize="14px">
							{" "}
							${itinerarie.baseTicketPrice}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: "7px",
						}}
					>
						<EventSeatIcon color="primary" fontSize="inherit" />
						<Typography variant="h6" fontSize="13px">
							{itinerarie.seats.filter((s) => s.occupied).length} /{" "}
							{itinerarie.seats.length}
						</Typography>
					</Box>
				</Box>
				<Button
					onClick={() => handleOpenModal(itinerarie)}
					sx={{
						position: "absolute",
						top: "10px",
						right: "10px",
						borderRadius: "50%",
						padding: "10px",
						border: "1px solid #fdd835",
						minWidth: "0",
					}}
				>
					<AddShoppingCartIcon color="primary" fontSize="medium" />
				</Button>
			</Card>
		</>
	);
}

export default Item;
