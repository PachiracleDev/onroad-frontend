import { useClearCart, useGetCart } from "@/services/api/cart";
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	Modal,
	Typography,
} from "@mui/material";
import { useState } from "react";
import ItemInCart from "./ItemInCart";
import BaseButton from "../shared/buttons/BaseButton";
import { calculatePrice } from "@/utils/calculatePrice";
import CloseIcon from "@mui/icons-material/Close";
import PaymentForm from "./PaymentForm";
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
	buttonsContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",

		gap: "10px",
	},
	button: {
		width: "50%",
		padding: "5px 0",
	},
	modalContent: (theme: any) => ({
		top: "calc(50vh - 100px)",
		margin: "auto",
		position: "relative",
		width: {
			xs: "100%",
			lg: "30%",
		},
		color: "#ffff",
		overflowY: "auto",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		outline: "none",
		padding: theme.spacing(2),
		textAlign: "center",
	}),
});

function CartItems({ onClose }: { onClose: () => void }) {
	const { data, isLoading } = useGetCart();
	const [openModal, setOpenModal] = useState(false);
	const { mutate, isLoading: loadingClearCart } = useClearCart();
	const styles = useStyles();
	return (
		<>
			<Box
				sx={{
					marginLeft: "90px",
					marginTop: "20px",
					position: "relative",
					marginRight: "35px",
				}}
			>
				<Typography variant="h6">My Cart</Typography>

				<Button
					sx={{
						position: "absolute",
						top: "0",
						right: "0",
						minWidth: "0",
						borderRadius: "50%",
						padding: "5px",
					}}
					onClick={onClose}
				>
					<CloseIcon color="warning" fontSize="medium" />
				</Button>

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
					{data && data.items.length === 0 && (
						<Typography
							sx={{
								fontSize: "14px",
								color: "#ccc",
							}}
							variant="h6"
						>
							No items in cart 😔😔
						</Typography>
					)}

					{data && data.items.length > 0 && (
						<>
							{data.items.map((item, index) => (
								<ItemInCart item={item} key={item.id + index} />
							))}

							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-end",
								}}
							>
								<Typography
									sx={{
										fontSize: "14px",
										color: "#ccc",
									}}
									variant="h6"
								>
									Total: $
									{!!data &&
										data.items
											.reduce((acc, item) => {
												return (
													acc +
													+item.seats
														.map(
															(seat) =>
																+calculatePrice(
																	+item.itinerarie.baseTicketPrice,
																	seat.type,
																	item.itinerarie.porcentageIncreaseSeatType
																)
														)
														.reduce((acc, item) => acc + item, 0)
														.toFixed(2)
												);
											}, 0)
											.toFixed(2)}
								</Typography>
							</Box>

							<Box sx={styles.buttonsContainer}>
								<BaseButton
									variant="outlined"
									color="warning"
									onClick={() => {
										mutate();
									}}
									disabled={loadingClearCart}
									sx={styles.button}
								>
									Clear Cart
								</BaseButton>
								<BaseButton
									variant="contained"
									color="primary"
									onClick={() => {
										setOpenModal(true);
									}}
									disabled={false}
									sx={styles.button}
								>
									Checkout
								</BaseButton>
							</Box>
						</>
					)}
				</Grid>
			</Box>
			{data && data.items.length > 0 && (
				<Modal
					BackdropProps={{
						onClick: () => setOpenModal(false),
					}}
					open={openModal}
					onClose={() => setOpenModal(false)}
					sx={{
						top: "calc(50vh - 650px)",
					}}
				>
					<Box sx={styles.modalContent}>
						<PaymentForm cart={data.items} />
					</Box>
				</Modal>
			)}
		</>
	);
}

export default CartItems;
