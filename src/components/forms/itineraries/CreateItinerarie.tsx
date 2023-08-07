import { useForm } from "react-hook-form";
import BaseSelect from "@/components/shared/inputs/BaseSelect";
import BaseTextField from "@/components/shared/inputs/BaseTextField";
import BaseButton from "@/components/shared/buttons/BaseButton";
import DatePickerCustom from "@/components/shared/pickers/DatePickerCustom";
import moment from "moment-timezone";
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
		marginTop: "1.25rem",
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

import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { departamentos } from "@/data/departamentos";
import { useGetBuses } from "@/services/api/buses";
import { useCreateItinerarie } from "@/services/api/itineraries";

function CreateItinerarie() {
	const { mutate, isLoading: createItinerarieLoading } = useCreateItinerarie();
	const { data: buses, isLoading: busesLoading } = useGetBuses();
	const validationSchema = Yup.object().shape({
		origin: Yup.string().required("Origin is required"),
		destination: Yup.string().required("Destination is required"),
		baseTicketPrice: Yup.number().required("Ticket Price is required"),
		bus: Yup.string().required("Bus is required"),
		closingTime: Yup.string().required("Closing Time is required"),
		openingTime: Yup.string().required("Opening Time is required"),
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
		setValue,
		getValues,
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			origin: "",
			destination: "",
			baseTicketPrice: 0,
			bus: "",
			closingTime: "",
			openingTime: "",
		},
	});

	const onSubmit = (data: {
		origin: string;
		destination: string;
		maxCapacity: number;
		baseTicketPrice: number;
		bus: any;
		closingTime: string;
		openingTime: string;
	}) => {
		data.bus = +data.bus;
		const closingTime = moment(
			data.closingTime,
			"ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
		).toISOString();

		const openingTime = moment(
			data.openingTime,
			"ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
		).toISOString();

		mutate({
			closingTime,
			openingTime,
			bus: data.bus,
			destination: data.destination,
			origin: data.origin,
			baseTicketPrice: data.baseTicketPrice,
		});
		reset();
	};

	return (
		<Box sx={styles.content}>
			<Typography variant="h6" sx={styles.header}>
				Create Itinerarie
			</Typography>
			<Grid container spacing={2} sx={styles.form}>
				<Grid item xs={6}>
					<BaseSelect
						showLabel
						control={control}
						fullWidth={true}
						required={true}
						label="Origin"
						variant="standard"
						size="medium"
						id="origin"
						name="origin"
						errors={errors.origin}
						options={Object.keys(departamentos)
							.filter((val) => val !== getValues("destination"))
							.map((val) => ({
								label: val,
								value: val,
							}))}
					/>
				</Grid>
				<Grid item xs={6}>
					<BaseSelect
						showLabel
						control={control}
						fullWidth={true}
						required={true}
						id="destination"
						name="destination"
						label="Destination"
						variant="standard"
						size="medium"
						errors={errors.destination}
						options={Object.keys(departamentos)
							.filter((val) => val !== getValues("origin"))
							.map((val) => ({
								label: val,
								value: val,
							}))}
					/>
				</Grid>

				<Grid item xs={6}>
					<DatePickerCustom
						label="Opening Time"
						views={["day", "month", "hours", "minutes"]}
						value={
							getValues("openingTime").length == 0
								? null
								: getValues("openingTime")
						}
						minDate={moment()}
						maxDate={moment().add(1, "year")}
						onChange={(e: any) => {
							setValue("openingTime", e);
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<DatePickerCustom
						label="Closing Time"
						views={["day", "month", "hours", "minutes"]}
						value={
							getValues("closingTime").length == 0
								? null
								: getValues("closingTime")
						}
						minDate={moment()}
						maxDate={moment().add(1, "year")}
						onChange={(e: any) => {
							setValue("closingTime", e);
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<BaseTextField
						required={true}
						label="Base Price"
						variant="standard"
						size="medium"
						name="baseTicketPrice"
						id="baseTicketPrice"
						errors={errors.baseTicketPrice}
						{...register("baseTicketPrice")}
					/>
				</Grid>
				<Grid item xs={6} marginX="auto" alignSelf="center">
					{buses ? (
						<BaseSelect
							showLabel
							control={control}
							fullWidth={true}
							required={true}
							id="bus"
							name="bus"
							label="Bus"
							variant="standard"
							size="medium"
							errors={errors.bus}
							options={buses.map(({ carPlate, id }) => ({
								label: carPlate,
								value: id,
							}))}
						/>
					) : (
						<CircularProgress size={20} />
					)}
				</Grid>
			</Grid>
			<Box sx={styles.buttonContainer}>
				<Box sx={styles.grow} />
				<BaseButton
					variant="contained"
					color="primary"
					disabled={createItinerarieLoading}
					onClick={handleSubmit(onSubmit)}
					sx={styles.ml1}
				>
					Create Itinerarie
				</BaseButton>
			</Box>
		</Box>
	);
}

export default CreateItinerarie;
