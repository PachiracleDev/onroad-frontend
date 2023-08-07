import { Box, Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";

const socketPresence = io("http://localhost:5000", {
	autoConnect: false,
});

const socketChat = io("http://localhost:7000", {
	autoConnect: false,
});

function ChatList() {
	const router = useRouter();

	const conversationId = router.query?.conversationId as string | undefined;

	const access = Cookies.get("access");

	const [conversations, setConversations] = useState<any[]>([]);
	const [onroadActive, setOnroadActive] = useState<any[]>([]);

	useEffect(() => {
		if (!!access) {
			socketChat.auth = { access };
			socketChat.connect();

			socketPresence.auth = { access };
			socketPresence.connect();
		}
	}, [access, onroadActive]);

	useEffect(() => {
		socketChat.on("get-all-conversations", (data) => {
			setConversations(data);
		});
		return () => {
			socketChat.off("get-all-conversations");
		};
	}, []);

	useEffect(() => {
		socketPresence.on("onroadActive", (data) => {
			const verifyExist = onroadActive.filter((u) => u.id == data.id);
			if (verifyExist.length == 0) {
				setOnroadActive((prev) => [...prev, data]);
			} else {
				setOnroadActive((prev) =>
					prev.map((u) => {
						if (u.id == data.id) {
							return data;
						}
						return u;
					})
				);
			}
		});
	}, [onroadActive]);

	const verifyActive = (userId: number) => {
		if (onroadActive.length > 0) {
			const actives = onroadActive.filter((u) => u.isActive).map((u) => u.id);

			return actives.includes(userId);
		}
		return false;
	};

	useEffect(() => {
		if (conversations.length > 0 && !conversationId) {
			console.log(conversations[0]);
			router.push(`/panel/chat/?conversationId=${conversations[0].id}`);
		}
	}, [router, conversationId, conversations]);

	return (
		<Box sx={{ marginLeft: "90px", marginTop: "20px", marginRight: "10px" }}>
			<Typography variant="h6">Onroad Team</Typography>

			<Grid container sx={{ marginTop: "20px" }} gap={2} flexDirection="column">
				{conversations.length == 0 && (
					<Typography variant="body1" color="slategray" fontSize="13px">
						No conversations yet 😒😒
					</Typography>
				)}
				{conversations.length > 0 &&
					conversations.map((chat) => (
						<Card
							sx={{
								minHeight: 50,
								borderRadius: "8px",
								backgroundColor:
									conversationId == chat.id.toString() ? "#212121" : "",
								backgroundImage: "none",
								position: "relative",
								padding: "0.5rem",
								cursor: "pointer",
								border: "1px solid #212121",
								"&:hover": {
									backgroundColor: "#212121",
								},
							}}
							onClick={() =>
								router.push(`/panel/chat/?conversationId=${chat.id}`)
							}
							key={chat.id}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									gap: "7px",
									alignItems: "center",
								}}
							>
								<Box
									sx={{
										position: "absolute",
										top: "6px",
										right: "6px",
									}}
								>
									<Typography variant="body1" color="gray" fontSize="13px">
										{new Date(chat.lastUpdated).toLocaleDateString()}
									</Typography>
								</Box>
								<Box>
									{chat.userIds.length > 1 ? (
										<PeopleIcon color="primary" fontSize="large" />
									) : (
										<AccountCircleIcon color="primary" fontSize="large" />
									)}
								</Box>
								{chat.userIds.map((user: any) => (
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											gap: "3px",
											alignItems: "center",
										}}
										key={user.id}
									>
										<Typography fontSize="13px" variant="body1">
											{user.name}
										</Typography>
										{verifyActive(user.id) && (
											<Box
												sx={{
													borderRadius: "50%",
													backgroundColor: "#22c55e",
													width: "10px",
													height: "10px",
												}}
											/>
										)}
									</Box>
								))}
							</Box>
						</Card>
					))}
			</Grid>
		</Box>
	);
}

export default ChatList;
