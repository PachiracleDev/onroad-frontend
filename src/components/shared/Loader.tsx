import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function Loader() {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				width: "100vw",
				zIndex: 9999,
				position: "absolute",
				backgroundColor: "#212121",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography
					sx={{
						color: "#fdd835",
						fontSize: "30px",
						fontWeight: "bold",
						marginBottom: "20px",
					}}
				>
					ONROAD
				</Typography>
				<CircularProgress size={30} />
			</Box>
		</Box>
	);
}

export default Loader;
