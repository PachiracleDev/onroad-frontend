import { useGetBuses } from "@/services/api/buses";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import Image from "next/image";
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

function BusesList() {
	const styles = useStyles();
	const { isLoading, data } = useGetBuses();

	return (
		<Box sx={{ marginLeft: "120px", marginTop: "20px", marginRight: "35px" }}>
			<Typography variant="h6">List of Buses</Typography>
			{isLoading && (
				<Box
					sx={{ display: "flex", marginTop: "20px", justifyContent: "center" }}
				>
					<CircularProgress />
				</Box>
			)}
			<Grid container sx={{ marginTop: "20px" }} gap={2} flexDirection="column">
				{data &&
					data.map((bus) => (
						<Card sx={styles.card} key={bus.id}>
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
										alt={bus.carPlate}
										src={bus.imageUrl}
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
										<AccountBoxIcon color="primary" fontSize="inherit" />
										<Typography variant="h6" fontSize="13px">
											{bus.operator.name}
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
										<TimeToLeaveIcon color="primary" fontSize="inherit" />
										<Typography variant="h6" fontSize="13px">
											{bus.carPlate}
										</Typography>
									</Box>
								</Box>
							</Box>
						</Card>
					))}
			</Grid>
		</Box>
	);
}

export default BusesList;
