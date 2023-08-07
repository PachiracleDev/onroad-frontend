import MyReservation from "@/components/reservations/MyReservation";
import { ProtectedRoute } from "@/context/AuthStore";
import MainLayout from "@/layout/main";
import { useGetMyReservations } from "@/services/api/reservations";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
const useStyles = () => ({
	cardButton: (theme: any) => ({
		height: "40px",
		textTransform: "none",
		width: "100%",
		borderRadius: "0",
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			color: "black",
		},
	}),

	root: (theme: any) => ({
		backgroundColor: theme.palette.background.light,
		width: "100%",
		height: "100%",
	}),
	container: (theme: any) => ({
		width: {
			xs: "100%",
			lg: "30%",
		},
		margin: "auto",
		display: "flex",
		padding: "20px",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	}),
	title: (theme: any) => ({
		fontWeight: "bold",
		fontSize: "30px",
		borderBottom: "2px solid",
		borderBottomColor: theme.palette.primary.main,
		color: theme.palette.primary.main,
	}),
});

function MyReservationsPage() {
	const { data, isLoading } = useGetMyReservations();
	const styles = useStyles();
	return (
		<ProtectedRoute>
			<MainLayout>
				<Box sx={styles.root}>
					<Box sx={styles.container}>
						<Typography sx={styles.title} variant="h6">
							My Reservations
						</Typography>
						{isLoading && (
							<Box
								sx={{
									display: "flex",
									marginTop: "20px",
									justifyContent: "center",
								}}
							>
								<CircularProgress />
							</Box>
						)}
						<Grid
							container
							sx={{ marginTop: "20px" }}
							gap={2}
							flexDirection="column"
						>
							{data &&
								data.map((reservation) => (
									<MyReservation
										key={reservation.id}
										reservation={reservation}
									/>
								))}
						</Grid>
					</Box>
				</Box>
			</MainLayout>
		</ProtectedRoute>
	);
}

export default MyReservationsPage;
