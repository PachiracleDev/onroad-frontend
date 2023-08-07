import CreateItinerarie from "@/components/forms/itineraries/CreateItinerarie";
import { ProtectedRoute } from "@/context/AuthStore";
import { Box, Typography } from "@mui/material";
import React from "react";

const styles = {
	root: (theme: any) => ({
		display: "flex",
		flexDirection: "column",
		height: "100vh",
		marginLeft: "3.5rem",
		alignItems: "center",
		backgroundColor: theme.palette.grey[900],
	}),
	content: {
		paddingTop: "1.25rem",
		width: "40%",
		maxWidth: "500px",
	},
	header: (theme: any) => ({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "4.1875rem",
		width: "100%",
		backgroundColor: theme.palette.background.dark,
		fontSize: "1.5rem",
		fontWeight: "bold",
		lineHeight: "1.7581rem",
	}),
	form: {
		paddingBottom: "30px",
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	grow: {
		flexGrow: 1,
	},
	ml1: {
		marginLeft: 1,
	},
};

function ItinerariesPage() {
	return (
		<ProtectedRoute>
			<Box overflow="auto" data-testid="user-page" sx={styles.root}>
				<Box sx={styles.header}>
					<Typography color="white" variant="h6">
						Manage Itineraries
					</Typography>
				</Box>
				<CreateItinerarie />
			</Box>
		</ProtectedRoute>
	);
}

export default ItinerariesPage;
