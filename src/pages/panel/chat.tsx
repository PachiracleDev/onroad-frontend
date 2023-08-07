import { ProtectedRoute } from "@/context/AuthStore";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import CommentsList from "@/components/chat/CommentsList";
import CreateMessage from "@/components/chat/CreateMessage";
import { useGetOldMessages } from "@/services/api/chat";
import OldMessages from "@/components/chat/OldMessages";
import { useQueryClient } from "@tanstack/react-query";

const useStyles = () => ({
	root: (theme: any) => ({
		backgroundColor: theme.palette.background.light,
		width: "100%",
		display: "flex",
		flexDirection: "column",
		height: "100vh",
		marginLeft: "3.5rem",
		alignItems: "center",
		justifyContent: "center",
	}),
	container: {
		width: "100vw",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		width: "80vw",
		height: "80vh",
		maxWidth: "500px",
		maxHeight: "700px",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		position: "relative",
	},
	messagesBody: (theme: any) => ({
		width: "calc( 100% - 34px )",
		margin: "20px 0 10px 0",
		overflowY: "scroll",
		height: "100%",
		padding: "10px",
		backgroundColor: theme.palette.background.light,
	}),
});

const socketChat = io("http://localhost:7000", {
	autoConnect: false,
});

export type MessageT = {
	conversationId: number;
	createdAt: Date;
	message: string;
	id: number;
	me: boolean;
};

function ChatPage() {
	const router = useRouter();
	const styles = useStyles();

	const conversationId = router.query?.conversationId as string | null;
	const [messages, setMessages] = useState<MessageT[]>([]);
	const access = Cookies.get("access");
	const refSocket = useRef() as any;

	useEffect(() => {
		if (!!access) {
			socketChat.auth = { access };
			socketChat.connect();

			refSocket.current = socketChat;
		}
	}, [access]);

	//CONECTATE AQUÍ XD

	useEffect(() => {
		if (!refSocket.current) return;
		refSocket.current.on("new-message", (data: any) => {
			setMessages((prev) => [
				...prev,
				{
					...data,
					me: false,
				},
			]);
		});

		return () => {
			refSocket.current.off("new-message");
		};
	}, []);

	const handleCreateMessage = (message: string) => {
		if (refSocket.current) {
			refSocket.current.emit("send-message", {
				conversationId,
				message,
			});
		}
	};

	useEffect(() => {
		setMessages([]);
	}, [conversationId]);

	const refBodyChat = useRef() as any;

	const handleScroll = () => {
		if (!refBodyChat.current) return;
		refBodyChat.current.scrollTop = refBodyChat.current.scrollHeight;
	};
	const client = useQueryClient();
	const handleCreateMyMessage = (message: string) => {
		if (!conversationId) return;
		const newMessage = {
			conversationId: +conversationId,
			createdAt: new Date(),
			message,
			id: Math.random(),
			me: true,
		};

		setMessages((prev) => [...prev, newMessage]);
		// console.log(conversationId);
		// let oldData = client.getQueriesData([
		// 	"conversations",
		// 	{ conversationId },
		// ]) as any;

		// if (!oldData) return;

		// if (oldData.length === 1) {
		// 	client.setQueryData(["conversations", { conversationId }], {
		// 		pageParams: oldData.pageParams,
		// 		pages: [
		// 			...oldData.pages.slice(0, oldData.pages.length - 1),
		// 			[...oldData.pages[oldData.pages.length - 1], newMessage],
		// 		],
		// 	});

		// 	new Promise((resolve) => {
		// 		setTimeout(() => {
		// 			handleScroll();
		// 			resolve(true);
		// 		}, 10);
		// 	});
		// 	return;
		// }

		// if (oldData) {
		// 	oldData = oldData[0][1];
		// 	console.log(oldData);
		// 	client.setQueryData(["conversations", { conversationId }], {
		// 		pageParams: oldData.pageParams,
		// 		pages: [
		// 			...oldData.pages.slice(0, oldData.pages.length - 1),
		// 			[...oldData.pages[oldData.pages.length - 1], newMessage],
		// 		],
		// 	});

		// 	new Promise((resolve) => {
		// 		setTimeout(() => {
		// 			handleScroll();
		// 			resolve(true);
		// 		}, 10);
		// 	});
		// }
	};

	useEffect(() => {
		handleScroll();
	}, [messages]);

	return (
		<ProtectedRoute>
			<Box sx={styles.root}>
				{!conversationId ? (
					<Box>
						<Typography color="white">
							You need the onroad team!!, call them and have them create your
							account 😎😎
						</Typography>
					</Box>
				) : (
					<Box sx={styles.container}>
						<Paper sx={styles.paper}>
							<Paper
								id="style-1"
								className="scrollbar"
								ref={refBodyChat}
								sx={styles.messagesBody}
							>
								<OldMessages
									handleScroll={handleScroll}
									conversationId={conversationId}
								/>

								<CommentsList messages={messages} />
							</Paper>
							<CreateMessage
								handleCreateMyMessage={handleCreateMyMessage}
								handleCreateMessage={handleCreateMessage}
							/>
						</Paper>
					</Box>
				)}
			</Box>
		</ProtectedRoute>
	);
}

export default ChatPage;
