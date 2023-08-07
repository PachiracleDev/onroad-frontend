import {
	CartItemType,
	Seat,
	SeatOpen,
	SeatTypeEnum,
} from "@/services/api/cart";
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
		fontSize: "14px",
		fontWeight: "bold",
	},
	price: {
		color: "#ffff",
		fontSize: "12px",
	},
});

function SettingSeats({
	capacity,
	refSeats,
	defaultSeats,
	confirm,
	cartItems,
	porcentageIncreaseSeatType,
	basePrice,
	itinerarieId,
}: {
	capacity: any;
	refSeats: any;
	defaultSeats: SeatOpen[];
	confirm?: boolean;
	cartItems?: undefined | CartItemType[];
	porcentageIncreaseSeatType?: Record<SeatTypeEnum, number>;
	basePrice?: number;
	itinerarieId?: number;
}) {
	const [selecteds, setSelecteds] = useState<number[]>([]);
	const [seats, setSeats] = useState<Seat[]>(defaultSeats);
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
				{Array.from({ length: capacity }).map((_, index) => (
					<Box
						key={index}
						sx={{
							width: "30px", // Ancho del asiento
							height: "30px", // Altura del asiento
							background:
								seats[index]?.type === SeatTypeEnum.PREMIUM
									? "#fdd835"
									: seats[index]?.type === SeatTypeEnum.EJECUTIVO
									? "#ffa726"
									: "#b0bec5", // Color de fondo del asiento
							cursor: "pointer",
							borderRadius: "5px", // Borde redondeado del asiento
						}}
						onClick={() => {
							if (
								cartItems &&
								itinerarieId &&
								cartItems
									?.find((i) => i.itinerarie.id === itinerarieId)
									?.seats.map((s) => s.number)
									.includes(index + 1)
							) {
								return;
							}
							if (confirm) return;
							const verifyOccupied = defaultSeats.find(
								(s) => s.number === index + 1
							);

							if (verifyOccupied?.occupied) return;

							if (defaultSeats.length > 0) {
								const verifyExist = selecteds.includes(index + 1);
								if (verifyExist) {
									const newSelecteds = selecteds.filter((s) => s !== index + 1);
									setSelecteds(newSelecteds);
									refSeats.current = newSelecteds;
								} else {
									const newSelecteds = [...selecteds, index + 1];
									setSelecteds(newSelecteds);
									refSeats.current = newSelecteds;
								}

								return;
							}

							const newSeats = [...seats];
							newSeats[index] = {
								number: index + 1,
								type:
									seats[index]?.type === SeatTypeEnum.PREMIUM
										? SeatTypeEnum.TURISTA
										: seats[index]?.type === SeatTypeEnum.EJECUTIVO
										? SeatTypeEnum.PREMIUM
										: SeatTypeEnum.EJECUTIVO,
							};
							refSeats.current = newSeats;
							setSeats(newSeats);
						}}
					>
						{selecteds.includes(index + 1) && (
							<CheckIcon
								fontSize="small"
								sx={{
									color: "#000",
								}}
							/>
						)}
						{defaultSeats.length > 0 && defaultSeats[index]?.occupied && (
							<DoNotDisturbAltIcon
								fontSize="small"
								sx={{
									color: "#ef4444",
								}}
							/>
						)}

						{cartItems &&
							itinerarieId &&
							cartItems
								?.find((i) => i.itinerarie.id === itinerarieId)
								?.seats.map((s) => s.number)
								.includes(index + 1) && (
								<DoNotDisturbAltIcon
									fontSize="small"
									sx={{
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
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
						}}
					>
						<Typography sx={classes.text}>Tourist</Typography>
						{basePrice && (
							<Typography sx={classes.price}>
								$ {basePrice.toFixed(2)}
							</Typography>
						)}
					</Box>
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
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
						}}
					>
						<Typography sx={classes.text}>Executive</Typography>
						{porcentageIncreaseSeatType && basePrice && (
							<Typography sx={classes.price}>
								$
								{(
									basePrice * porcentageIncreaseSeatType[SeatTypeEnum.EJECUTIVO]
								).toFixed(2)}
							</Typography>
						)}
					</Box>
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
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
						}}
					>
						<Typography sx={classes.text}>Premium</Typography>
						{porcentageIncreaseSeatType && basePrice && (
							<Typography sx={classes.price}>
								${" "}
								{(
									basePrice * porcentageIncreaseSeatType[SeatTypeEnum.PREMIUM]
								).toFixed(2)}
							</Typography>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default SettingSeats;
