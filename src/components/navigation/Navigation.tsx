import React, { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import useRouterHook from "@/hooks/useRouter";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import MenuAccount from "./MenuAccount";
import Link from "next/link";

const useStyles = () => ({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "100vh",
		width: "80px",
		padding: "10px 0",
	},
	listItem: {
		padding: 0,
	},
	listItemNoAction: {
		paddingY: 1,
		paddingX: 0,
	},
	listButton: (theme: any) => ({
		flexDirection: "column",
		paddingBottom: 0,
		paddingTop: 1,
		"&.Mui-selected": {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
		},
		"&.Mui-selected:hover": {
			backgroundColor: theme.palette.primary.main,
		},
		"&.Mui-selected .MuiListItemIcon-root": {
			color: theme.palette.primary.contrastText,
		},
	}),
	listIcon: {
		padding: 0,
		justifyContent: "center",
	},
});

const DrawerItem = (props: any) => {
	const { action, selected, icon, text, divider, styles } = props;
	return (
		<>
			{action ? (
				<ListItem sx={styles.listItem}>
					<ListItemButton
						sx={styles.listButton}
						onClick={action}
						selected={selected}
					>
						<ListItemIcon sx={styles.listIcon}>{icon}</ListItemIcon>
						<ListItemText
							secondary={<Typography variant="caption">{text}</Typography>}
						/>
					</ListItemButton>
				</ListItem>
			) : (
				<ListItem sx={styles.listItemNoAction}>
					<ListItemIcon sx={styles.listIcon}>{icon}</ListItemIcon>
					<ListItemText
						secondary={<Typography variant="caption">{text}</Typography>}
					/>
				</ListItem>
			)}
			<Divider variant="inset" style={{ marginBlock: divider ? 10 : 0 }} />
		</>
	);
};

const ListComponent = () => {
	const styles = useStyles();

	const {
		pushBusesRoute,
		pushChatRoute,
		pushItinerariesRoute,
		pushOperatorsRoute,
		pushReservationsRoute,
		isBusesRoute,
		isChatRoute,
		isItinerariesRoute,
		isOperatorsRoute,
		isReservationsRoute,
	} = useRouterHook();
	const [signOutAnchorEl, setSignOutAnchorEl] = useState(false);
	const handleClose = () => {
		setSignOutAnchorEl(false);
	};

	const topList = [
		{
			id: 0,
			text: "",
			icon: (
				<Link href="/">
					<Box
						sx={{
							position: "relative",
						}}
					>
						<Typography
							variant="h6"
							sx={{
								margin: "0 0 0 10px",
							}}
							fontSize="1rem"
							component="div"
						>
							OR
						</Typography>
						<AdminPanelSettingsIcon
							fontSize="inherit"
							color="primary"
							sx={{
								position: "absolute",
								top: "0",
								right: "-17px",
							}}
						/>
					</Box>
				</Link>
			),
			selected: false,
		},
		{
			id: 1,
			text: "Chat",
			icon: <ChatBubbleIcon />,
			action: pushChatRoute,
			selected: false,
		},
		{
			id: 2,
			text: "Itineraries",
			icon: <DepartureBoardIcon />,
			action: pushItinerariesRoute,
			selected: isItinerariesRoute,
		},
		{
			id: 3,
			text: "Buses",
			icon: <DirectionsBusIcon />,
			action: pushBusesRoute,
			selected: isBusesRoute,
		},
		{
			id: 4,
			text: "Operators",
			icon: <AssignmentIndIcon />,
			action: pushOperatorsRoute,
			selected: isOperatorsRoute,
		},
	];

	const bottomList = [
		{
			id: 5,
			icon: <PersonIcon fontSize="medium" />,
			action: (e: any) => setSignOutAnchorEl(e.currentTarget),
			selected: false,
		},
	];

	return (
		<Box sx={styles.root}>
			<List>
				{topList
					.filter(({ hide }: any) => !hide)
					.map((item) => (
						<DrawerItem key={item.id} {...{ ...item, styles }} />
					))}
			</List>
			<List>
				{bottomList
					.filter(({ hide }: any) => !hide)
					.map((item) => (
						<DrawerItem key={item.id} {...{ ...item, styles }} />
					))}
			</List>
			<MenuAccount anchorEl={signOutAnchorEl} onClose={handleClose} />
		</Box>
	);
};

DrawerItem.propTypes = {
	styles: PropTypes.object,
	action: PropTypes.func,
	selected: PropTypes.bool,
	icon: PropTypes.element,
	text: PropTypes.string,
	divider: PropTypes.bool,
};

ListComponent.propTypes = {};

export default ListComponent;
