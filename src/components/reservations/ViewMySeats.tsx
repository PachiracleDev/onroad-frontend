import { Seat, SeatOpen, SeatTypeEnum } from "@/services/api/cart";
import { Box, Typography } from "@mui/material";
import { type } from "os";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

const useStyles = () => ({
	busContainer: (theme: any) => ({
		width: "200px", // Ancho del autobús
		height: "500px", // Altura del autobús
		background: "#1a1a1a", // Color de fondo del autobús
		paddingTop: "90px", // Espacio entre el techo y el primer asiento
		paddingBottom: "30px", // Espacio entre el último asiento y el piso
		borderRadius: "70px 70px 0 0", // Borde redondeado del autobús
		display: "flex",
		flexWrap: "wrap",
		gap: "10px",
		paddingX: "10px",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		overflow: "hidden",
	}),
	boxItemLeyend: {
		display: "flex",
		flexDirection: "row",
		gap: "8px",
		alignItems: "center",
	},
	text: {
		color: "#ffff",
		fontSize: "15px",
		fontWeight: "bold",
	},
});

function ViewMySeats({
	defaultSeats,
	mySeats,
}: {
	defaultSeats: SeatOpen[];
	mySeats: Seat[];
}) {
	console.log(mySeats);
	const classes = useStyles();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box sx={classes.busContainer}>
				<Box
					sx={{
						position: "absolute",
						top: "30px",
						width: "90%",
						height: "7%",
						borderRadius: "50px 50px 0 0",
						background: "#cccc",
					}}
				/>
				{Array.from({ length: defaultSeats.length }).map((_, index) => (
					<Box
						key={index}
						sx={{
							width: "30px", // Ancho del asiento
							height: "30px", // Altura del asiento
							background:
								defaultSeats[index]?.type === SeatTypeEnum.PREMIUM
									? "#fdd835"
									: defaultSeats[index]?.type === SeatTypeEnum.EJECUTIVO
									? "#ffa726"
									: "#b0bec5", // Color de fondo del asiento

							borderRadius: "5px", // Borde redondeado del asiento
							position: "relative",
						}}
					>
						{mySeats.map((s) => s.number).includes(index + 1) && (
							<CheckIcon
								sx={{
									color: "#000",
								}}
								fontSize="small"
							/>
						)}

						{defaultSeats[index]?.occupied &&
							!mySeats.map((s) => s.number).includes(index + 1) && (
								<DoNotDisturbAltIcon
									sx={{
										position: "absolute",
										top: "0",
										left: "0",
										color: "#ef4444",
									}}
								/>
							)}
					</Box>
				))}
			</Box>
			<Box
				sx={{
					marginTop: "20px",
					display: "flex",
					gap: "20px",
				}}
			>
				<Box sx={classes.boxItemLeyend}>
					<Box
						sx={{
							width: "30px", // Ancho del asiento
							height: "30px", // Altura del asiento
							background: "#b0bec5", // Color de fondo del asiento

							borderRadius: "5px", // Borde redondeado del asiento
						}}
						onClick={() => {}}
					/>
					<Typography sx={classes.text}>Tourist</Typography>
				</Box>
				<Box sx={classes.boxItemLeyend}>
					<Box
						sx={{
							width: "30px", // Ancho del asiento
							height: "30px", // Altura del asiento
							background: "#ffa726", // Color de fondo del asiento

							borderRadius: "5px", // Borde redondeado del asiento
						}}
						onClick={() => {}}
					/>
					<Typography sx={classes.text}>Executive</Typography>
				</Box>
				<Box sx={classes.boxItemLeyend}>
					<Box
						sx={{
							width: "30px", // Ancho del asiento
							height: "30px", // Altura del asiento
							background: "#fdd835", // Color de fondo del asiento

							borderRadius: "5px", // Borde redondeado del asiento
						}}
						onClick={() => {}}
					/>
					<Typography sx={classes.text}>Premium</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export default ViewMySeats;
