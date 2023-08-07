import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import BaseTextField from "../shared/inputs/BaseTextField";
import { useForm } from "react-hook-form";

const useStyles = () => ({
	wrapForm: {
		display: "flex",
		justifyContent: "center",
		width: "95%",
		padding: "10px",
		gap: "10px",
		maxWidth: "500px",
	},
	wrapText: {
		width: "100%",
	},
});

function CreateMessage({
	handleCreateMessage,
	handleCreateMyMessage,
}: {
	handleCreateMessage: (message: string) => void;
	handleCreateMyMessage: any;
}) {
	const styles = useStyles();

	const { register, reset, handleSubmit } = useForm({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit = (data: { message: string }) => {
		if (data.message.trim() == "") return;
		handleCreateMessage(data.message);
		handleCreateMyMessage(data.message);

		reset();
	};

	return (
		<Box sx={styles.wrapForm}>
			<BaseTextField
				sx={styles.wrapText}
				variant="outlined"
				label="Message"
				onKeyDown={(e: any) => {
					if (e.key == "Enter") {
						onSubmit({ message: e.target.value });
					}
				}}
				id="message"
				{...register("message")}
			/>
			<Button
				sx={{
					backgroundColor: "#fdd835",
					"&:hover": {
						backgroundColor: "#000",
					},
				}}
				variant="contained"
				color="primary"
				onClick={handleSubmit(onSubmit)}
			>
				<SendIcon color="primary" />
			</Button>
		</Box>
	);
}

export default CreateMessage;
