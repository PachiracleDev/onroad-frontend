import { useGetItineraries } from "@/services/api/itineraries";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventSeatIcon from "@mui/icons-material/EventSeat";
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

function ItinerariesList() {
	const { data, isLoading } = useGetItineraries();

	const styles = useStyles();
	return (
		<Box sx={{ marginLeft: "120px", marginTop: "20px", marginRight: "35px" }}>
			<Typography variant="h6">List of Itineraries</Typography>
			{isLoading && (
				<Box
					sx={{ display: "flex", marginTop: "20px", justifyContent: "center" }}
				>
					<CircularProgress />
				</Box>
			)}
			<Grid container sx={{ marginTop: "20px" }} gap={2} flexDirection="column">
				{data &&
					data.map((itinerarie) => (
						<Card sx={styles.card} key={itinerarie.id}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									gap: "7px",
									alignItems: "center",
								}}
							>
								<Box>
									<Image
										alt="Bus Onroad"
										src={itinerarie.bus.imageUrl}
										width={90}
										height={90}
									/>
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
										{new Date(itinerarie.openingTime).toLocaleDateString("PE")}
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
										{new Date(itinerarie.closingTime).toLocaleDateString("PE")}
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
										{itinerarie.baseTicketPrice}
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
						</Card>
					))}
			</Grid>
		</Box>
	);
}

export default ItinerariesList;
