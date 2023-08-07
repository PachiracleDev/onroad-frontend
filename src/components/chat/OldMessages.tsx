import React, { Fragment, memo, useEffect, useState } from "react";
import Message from "./Message";
import { MessageT } from "@/pages/panel/chat";
import { Waypoint } from "react-waypoint";
import { useGetOldMessages } from "@/services/api/chat";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getDate } from "@/utils/getDate";

function OldMessages({
	conversationId,
	handleScroll,
}: {
	conversationId: string;
	handleScroll: any;
}) {
	const {
		data,
		fetchPreviousPage,
		isFetchingPreviousPage,
		isLoading,
		hasPreviousPage,
	} = useGetOldMessages(conversationId);

	useEffect(() => {
		if (!data) return;
		if (data.pages.length === 1) {
			handleScroll();
		}
	}, [data, handleScroll, isFetchingPreviousPage]);

	const handleWaypointEnter = () => {
		fetchPreviousPage();
	};

	console.log(data);

	return (
		<>
			{(isLoading || isFetchingPreviousPage) && (
				<Box
					sx={{
						justifyContent: "center",
						display: "flex",
						marginTop: "20px",
					}}
				>
					<CircularProgress />
				</Box>
			)}
			{hasPreviousPage && (
				<Waypoint bottomOffset="-100px" onEnter={handleWaypointEnter} />
			)}
			{data &&
				data?.pages.map((page, index) => (
					<PageMessages
						key={Math.random()}
						hasPreviousPage={hasPreviousPage}
						page={page}
					/>
				))}
		</>
	);
}

//eslint-disable-next-line react/display-name
const PageMessages = memo(({ hasPreviousPage, page }: any) => {
	return (
		<>
			{hasPreviousPage && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							width: "40%",
							height: "1px",
							backgroundColor: "#000",
							marginY: "10px",
						}}
					/>
					<Typography
						sx={{
							fontSize: "12px",
							paddingX: "3px",
						}}
						variant="body1"
					>
						{getDate(page[0].createdAt)}
					</Typography>
					<Box
						sx={{
							width: "40%",
							height: "1px",
							backgroundColor: "#000",
							marginY: "10px",
						}}
					/>
				</Box>
			)}

			{page.map((message: MessageT) => (
				<Message key={message.id} message={message} />
			))}
		</>
	);
});

export default OldMessages;
