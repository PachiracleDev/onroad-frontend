import { useForm } from "react-hook-form";
import BaseSelect from "@/components/shared/inputs/BaseSelect";
import BaseTextField from "@/components/shared/inputs/BaseTextField";
import BaseButton from "@/components/shared/buttons/BaseButton";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
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
		marginY: "1.25rem",
		paddingTop: "1.25rem",
		width: "40%",
		maxWidth: "500px",
		borderRadius: "20px",
		border: "1px solid #737373",
		padding: "1rem",
	},
	header: (theme: any) => ({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "3.1875rem",
		width: "100%",
		borderBottom: "1px solid #737373",
		fontSize: "1.2rem",
		fontWeight: "bold",
		lineHeight: "1.7581rem",
		marginBottom: "1rem",
		color: "#fff",
		borderRadius: "20px",
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

import { useState, useRef } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadImageBus, useCreateBus } from "@/services/api/buses";
import { useGetOperators } from "@/services/api/operators";
import { toast } from "react-toastify";
import Image from "next/image";
import { SeatTypeEnum } from "@/services/api/cart";
import SettingSeats from "./SettingSeats";

const supportedFile = ["image/png", "image/jpeg", "image/jpg"];

function CreateBus() {
	const [fileState, setFileState] = useState<File | null>();

	const { data: operators, isLoading: loadingOperators } = useGetOperators();
	const { mutate, isLoading } = useCreateBus();
	const validationSchema = Yup.object().shape({
		carPlate: Yup.string().required("First Name is required"),
		operatorId: Yup.string().required("Operator is required"),
		executive: Yup.number().required("Executive is required"),
		premium: Yup.number().required("Premium is required"),
		maxCapacity: Yup.number()
			.min(20)
			.max(35)
			.required("Max Capacity is required"),
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
		getValues,
		watch,
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			carPlate: "",
			operatorId: "",
			executive: 1,
			premium: 1,
			maxCapacity: 0,
		},
	});

	const refSeats = useRef() as any;

	const onSubmit = async (data: {
		carPlate: string;
		operatorId: string;
		executive: number;
		premium: number;
	}) => {
		if (!fileState) {
			toast.error("Image is required");
			return;
		}
		try {
			const imageUrl = await uploadImageBus(fileState);
			console.log(imageUrl);
			if (!imageUrl) {
				toast.error("Error uploading image");
				return;
			}

			setFileState(null);

			const seats = refSeats.current as any[];

			const newSeats = [...seats];
			if (seats.length < +watch("maxCapacity")) {
				for (let i = seats.length; i < +watch("maxCapacity"); i++) {
					newSeats.push({
						number: i + 1,
						type: SeatTypeEnum.TURISTA,
					});
				}
			}

			mutate({
				carPlate: data.carPlate,
				imageUrl: imageUrl,
				operator: +data.operatorId,
				porcentageIncreaseSeatType: {
					[SeatTypeEnum.EJECUTIVO]: data.executive,
					[SeatTypeEnum.PREMIUM]: data.premium,
					[SeatTypeEnum.TURISTA]: 1,
				},
				seats: newSeats,
			});
			reset();
		} catch (error) {
			toast.error("Error uploading image");
		}
	};

	const handleImageChange = (e: any) => {
		const file = e.target.files[0];
		if (!supportedFile.includes(file.type)) {
			toast.error("File type not supported");
			return;
		}
		setFileState(file);
	};

	return (
		<Box sx={styles.content}>
			<Typography variant="h6" sx={styles.header}>
				Create Bus
			</Typography>
			<Grid container spacing={2} sx={styles.form}>
				<Grid item xs={6}>
					<BaseTextField
						required={true}
						label="Car Plate"
						variant="standard"
						size="medium"
						errors={errors.carPlate}
						{...register("carPlate")}
					/>
				</Grid>
				<Grid item xs={6} alignSelf="center">
					{operators ? (
						<BaseSelect
							showLabel
							control={control}
							fullWidth={true}
							required={true}
							label="Operator"
							variant="standard"
							id="operatorId"
							name="operatorId"
							size="medium"
							errors={errors.operatorId}
							options={operators.map(({ id, name }) => ({
								label: name,
								value: id,
							}))}
						/>
					) : (
						<CircularProgress size={20} />
					)}
				</Grid>
				<Grid item xs={6}>
					<BaseTextField
						required={true}
						label="Increase Executive Price"
						variant="standard"
						size="medium"
						errors={errors.executive}
						{...register("executive")}
					/>
					<Typography fontSize="12px" color="primary">
						Increase Executive Price (1 = 100% increase)
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<BaseTextField
						required={true}
						label="Increase Premium Price"
						variant="standard"
						size="medium"
						errors={errors.premium}
						{...register("premium")}
					/>
					<Typography fontSize="12px" color="primary">
						Increase Premium Price (1 = 100% increase)
					</Typography>
				</Grid>
				<Grid
					sx={{ maxWidth: "100px", margin: "0 auto" }}
					justifySelf="center"
					item
					xs={6}
				>
					<BaseTextField
						required={true}
						label="Max Capacity"
						variant="standard"
						name="maxCapacity"
						id="maxCapacity"
						size="medium"
						errors={errors.maxCapacity}
						{...register("maxCapacity")}
					/>
				</Grid>
				<Grid
					xs={12}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginY: "1rem",
					}}
				>
					<SettingSeats
						defaultSeats={[]}
						refSeats={refSeats}
						capacity={watch("maxCapacity")}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						sx={{
							border: "1px solid #737373",
							borderRadius: "20px",
							maxWidth: "200px",
							padding: "0.2rem 1rem",
							minWidth: "0",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<label className="relative text-center inset-0 cursor-pointer">
							<Typography
								variant="body1"
								color="primary"
								fontSize="0.8rem"
								sx={{ fontWeight: "bold" }}
							>
								Add Image
							</Typography>
							<input
								onChange={(e) => handleImageChange(e)}
								accept="image/*"
								type="file"
								className="sr-only"
							/>
						</label>
					</Button>
				</Grid>
				<Grid display="flex" justifyContent="center" item xs={12}>
					{fileState && (
						<Box
							sx={{
								position: "relative",
							}}
						>
							<ClearIcon
								sx={{
									position: "absolute",
									top: "10px",
									right: "10px",
									cursor: "pointer",
								}}
								onClick={() => setFileState(null)}
								color="error"
								fontSize="medium"
							/>
							<Image
								src={URL.createObjectURL(fileState)}
								alt="Picture of the author"
								width={250}
								height={250}
							/>
						</Box>
					)}
				</Grid>
			</Grid>
			<Box sx={styles.buttonContainer}>
				<Box sx={styles.grow} />
				<BaseButton
					variant="contained"
					color="primary"
					disabled={isLoading}
					onClick={handleSubmit(onSubmit)}
					sx={styles.ml1}
				>
					Create Bus
				</BaseButton>
			</Box>
		</Box>
	);
}

export default CreateBus;
