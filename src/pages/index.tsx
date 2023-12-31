import { ProtectedRoute } from "@/context/AuthStore";
import { ItinerarieType, useGetItineraries } from "@/services/api/itineraries";
import { Typography, Grid, Box, CircularProgress } from "@mui/material";

import MainLayout from "@/layout/main";
import Item from "@/components/cart/Item";
import { useState, useRef } from "react";
import ModalTicket from "@/components/cart/ModalTicket";

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

export default function Home() {
	const styles = useStyles();
	const [itinerarieSelected, setItinerarieSelected] =
		useState<ItinerarieType | null>(null);
	const { data, isLoading } = useGetItineraries();
	const refModal = useRef() as any;

	const handleOpenModal = (itinerarie: ItinerarieType) => {
		setItinerarieSelected(itinerarie);
		refModal.current.handleOpen();
	};

	return (
		<ProtectedRoute>
			<MainLayout>
				<Box sx={styles.root}>
					<Box sx={styles.container}>
						<Typography sx={styles.title} variant="h6">
							List of Itineraries
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
								data.map((itinerarie) => (
									<Item
										key={itinerarie.id}
										handleOpenModal={handleOpenModal}
										itinerarie={itinerarie}
									/>
								))}
						</Grid>
					</Box>
					<ModalTicket ref={refModal} itinerarieSelected={itinerarieSelected} />
				</Box>
			</MainLayout>
		</ProtectedRoute>
	);
}
