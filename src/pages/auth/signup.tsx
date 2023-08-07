import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BaseTextField from "@/components/shared/inputs/BaseTextField";
import BaseButton from "@/components/shared/buttons/BaseButton";
import Link from "next/link";
import { useRegister } from "@/services/api/auth";
import { useAuthStore, ActionType } from "@/context/AuthStore";
import { useRouter } from "next/router";

const styles = {
	root: (theme: any) => ({
		display: "flex",
		flexDirection: "column",
		height: "100vh",
		alignItems: "center",
		backgroundColor: theme.palette.grey[900],
	}),
	content: (theme: any) => ({
		marginTop: "1.25rem",
		width: "40%",
		maxWidth: "500px",
		borderRadius: "20px",
		border: "1px solid #737373",
		padding: "2rem 1rem",
	}),
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginTop: "1rem",
		padding: "0 1rem",
	},
};
function SignupPage() {
	const router = useRouter();
	const { data, mutate, status, isLoading } = useRegister();
	const { dispatch } = useAuthStore();
	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Email is required").email("Email is invalid"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "Password must be at least 6 characters"),
		name: Yup.string().required("Name is required"),
	});
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	useEffect(() => {
		if (data && status === "success") {
			dispatch({
				type: ActionType.SIGNIN_SUCCESS,
				payload: data,
			});
			router.push("/");
		}
	}, [data, status, dispatch]);

	const onSubmit = (data: {
		email: string;
		password: string;
		name: string;
	}) => {
		mutate(data);
	};

	return (
		<Box sx={styles.root}>
			<Box sx={styles.content}>
				<Typography fontWeight={700} color="white" variant="h4">
					Signup
				</Typography>
				<Grid
					sx={{
						marginTop: "0.25rem",
					}}
					container
					spacing={2}
				>
					<Grid item xs={12}>
						<BaseTextField
							required={true}
							label="Name"
							id="name"
							name="name"
							variant="standard"
							type="email"
							size="medium"
							errors={errors.name}
							{...register("name")}
						/>
					</Grid>
					<Grid item xs={12}>
						<BaseTextField
							required={true}
							label="Email"
							variant="standard"
							type="email"
							id="email"
							name="email"
							size="medium"
							errors={errors.email}
							{...register("email")}
						/>
					</Grid>

					<Grid item xs={12}>
						<BaseTextField
							required={true}
							label="Password"
							id="password"
							name="password"
							variant="standard"
							size="medium"
							type="password"
							errors={errors.password}
							{...register("password")}
						/>
					</Grid>
					<Grid item xs={12} sx={styles.buttonContainer}>
						<BaseButton
							variant="contained"
							color="primary"
							disabled={isLoading}
							fullWidth
							sx={{}}
							onClick={handleSubmit(onSubmit)}
						>
							Signup
						</BaseButton>
					</Grid>
				</Grid>
			</Box>
			<Box
				sx={{
					marginTop: "1rem",
				}}
			>
				<Typography fontWeight={700} color="white" variant="h6" fontSize="13px">
					Already have an account?{" "}
					<Link href="/auth/signin" className="text-yellow-400">
						Signin
					</Link>
				</Typography>
			</Box>
		</Box>
	);
}

export default SignupPage;
