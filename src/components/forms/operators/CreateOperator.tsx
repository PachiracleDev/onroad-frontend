import { useForm } from "react-hook-form";
import BaseSelect from "@/components/shared/inputs/BaseSelect";
import BaseTextField from "@/components/shared/inputs/BaseTextField";
import BaseButton from "@/components/shared/buttons/BaseButton";

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
import { Box, Grid, Typography } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateOperator } from "@/services/api/operators";

function CreateOperator() {
	const { isLoading, mutate } = useCreateOperator();
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		phone: Yup.string().required("Phone is required"),
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			name: "",
			phone: "",
		},
	});

	const onSubmit = (data: { name: string; phone: string }) => {
		mutate(data);
		reset();
	};

	return (
		<Box sx={styles.content}>
			<Typography variant="h6" sx={styles.header}>
				Create Operator
			</Typography>
			<Grid container spacing={2} sx={styles.form}>
				<Grid item xs={12}>
					<BaseTextField
						required={true}
						label="Name"
						variant="standard"
						size="medium"
						errors={errors.name}
						{...register("name")}
					/>
				</Grid>
				<Grid item xs={12}>
					<BaseTextField
						required={true}
						label="Phone"
						variant="standard"
						size="medium"
						errors={errors.phone}
						{...register("phone")}
					/>
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
					Create Operator
				</BaseButton>
			</Box>
		</Box>
	);
}

export default CreateOperator;
