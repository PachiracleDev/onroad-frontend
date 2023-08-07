import { MessageT } from "@/pages/panel/chat";
import { getDate } from "@/utils/getDate";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

const useStyles = () => ({
	messageRow: {
		display: "flex",
	},
	messageRowRight: {
		display: "flex",
		justifyContent: "flex-end",
	},
	messageYellow: {
		position: "relative",
		marginLeft: "20px",
		marginBottom: "10px",
		padding: "10px",
		minWidth: "100px",
		maxWidth: "90%",
		backgroundColor: "#fdd835",
		width: "100%",
		//height: "50px",
		textAlign: "left",
		color: "#000",
		font: "400 .9em 'Open Sans', sans-serif",
		border: "1px solid #fdd835",
		borderRadius: "10px",
		"&:after": {
			content: "''",
			position: "absolute",
			width: "0",
			height: "0",
			borderTop: "15px solid #fdd835",
			borderLeft: "15px solid transparent",
			borderRight: "15px solid transparent",
			top: "0",
			left: "-15px",
		},
		"&:before": {
			content: "''",
			position: "absolute",
			width: "0",
			height: "0",
			borderTop: "17px solid #fdd835",
			borderLeft: "16px solid transparent",
			borderRight: "16px solid transparent",
			top: "-1px",
			left: "-17px",
		},
	},
	messageBlack: {
		position: "relative",
		marginRight: "20px",
		marginBottom: "10px",
		padding: "10px",
		backgroundColor: "#151515",

		maxWidth: "90%",
		minWidth: "100px",
		textAlign: "left",
		font: "400 .9em 'Open Sans', sans-serif",
		border: "1px solid #151515",
		borderRadius: "10px",
		"&:after": {
			content: "''",
			position: "absolute",
			width: "0",
			height: "0",
			borderTop: "15px solid #151515",
			borderLeft: "15px solid transparent",
			borderRight: "15px solid transparent",
			top: "0",
			right: "-15px",
		},
		"&:before": {
			content: "''",
			position: "absolute",
			width: "0",
			height: "0",
			borderTop: "17px solid #151515",
			borderLeft: "16px solid transparent",
			borderRight: "16px solid transparent",
			top: "-1px",
			right: "-17px",
		},
	},

	messageContent: {
		padding: 0,
		margin: "0px 0px 5px 0",
	},
	messageTimeStampRight: {
		position: "absolute",
		fontSize: ".6em",

		fontWeight: "300",
		marginTop: "10px",
		bottom: "4px",
		right: "5px",
	},

	displayName: {
		marginLeft: "20px",
	},
});

export const MessageLeft = (message: MessageT) => {
	const styles = useStyles();
	return (
		<>
			<Box sx={styles.messageRow}>
				<Box>
					<Box sx={styles.messageYellow}>
						<Box>
							<Typography sx={styles.messageContent}>
								{message.message}
							</Typography>
						</Box>
						<Box sx={styles.messageTimeStampRight}>
							{getDate(message.createdAt)}
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};
//avatarが右にあるメッセージ（自分）
export const MessageRight = (message: MessageT) => {
	const styles = useStyles();
	return (
		<Box sx={styles.messageRowRight}>
			<Box sx={styles.messageBlack}>
				<Typography sx={styles.messageContent}>{message.message}</Typography>
				<Box sx={styles.messageTimeStampRight}>
					{getDate(message.createdAt)}
				</Box>
			</Box>
		</Box>
	);
};

function Message({ message }: { message: MessageT }) {
	return (
		<>
			{message.me ? (
				<MessageRight {...message} />
			) : (
				<MessageLeft {...message} />
			)}
		</>
	);
}

export default memo(Message);
