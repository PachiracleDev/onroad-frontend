import { useGetOperators } from "@/services/api/operators";
import { Card, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CircularProgress from "@mui/material/CircularProgress";
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

function OperatorsList() {
	const styles = useStyles();
	const { data, isLoading, error } = useGetOperators();

	return (
		<Box sx={{ marginLeft: "120px", marginTop: "20px", marginRight: "35px" }}>
			<Typography variant="h6">List of operators</Typography>
			{isLoading && (
				<Box
					sx={{ display: "flex", marginTop: "20px", justifyContent: "center" }}
				>
					<CircularProgress />
				</Box>
			)}
			<Grid container sx={{ marginTop: "20px" }} gap={2} flexDirection="column">
				{data &&
					data.map((operator) => (
						<Card sx={styles.card} key={operator.id}>
							<Box
								sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
							>
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
										{operator.name}
									</Typography>
								</Box>

								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										gap: "1px",
										alignItems: "center",
									}}
								>
									<LocalPhoneIcon color="primary" fontSize="inherit" />
									<Typography variant="h6" fontSize="13px">
										{operator.phone}
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
										{new Date(operator.createdAt).toLocaleDateString()}
									</Typography>
								</Box>
							</Box>
						</Card>
					))}
			</Grid>
		</Box>
	);
}

export default OperatorsList;
