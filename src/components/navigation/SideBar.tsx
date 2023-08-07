import React from "react";
import DrawerCustom from "../shared/Drawer";
import useRouterHook from "@/hooks/useRouter";
import Navigation from "./Navigation";
import OperatorsList from "../operators/OperatorsList";
import BusesList from "../buses/BusesList";
import ItinerariesList from "../itineraries/ItinerariesList";
import ReservationList from "../reservations/ReservationList";
import ChatList from "../chat/ChatList";

function SideBar() {
	const {
		isChatRoute,
		isBusesRoute,
		isItinerariesRoute,
		isReservationsRoute,
		isOperatorsRoute,
	} = useRouterHook();

	return (
		<>
			<DrawerCustom
				variant="persistent"
				anchor="bottom"
				open={isChatRoute}
				onClose={() => {}}
			>
				<ChatList />
			</DrawerCustom>
			<DrawerCustom
				variant="persistent"
				anchor="left"
				width="80px"
				open={isReservationsRoute}
				onClose={() => {}}
			>
				<></>
			</DrawerCustom>
			<DrawerCustom
				isMain
				variant="persistent"
				anchor="left"
				width="416px"
				onClose={() => {}}
				open={isItinerariesRoute}
			>
				<ItinerariesList />
			</DrawerCustom>
			<DrawerCustom
				isMain
				variant="persistent"
				anchor="left"
				width="416px"
				onClose={() => {}}
				open={isBusesRoute}
			>
				<BusesList />
			</DrawerCustom>
			<DrawerCustom
				isMain
				variant="persistent"
				anchor="left"
				width="416px"
				onClose={() => {}}
				open={isOperatorsRoute}
			>
				<OperatorsList />
			</DrawerCustom>
			<DrawerCustom
				onClose={() => {}}
				isMain
				variant="persistent"
				anchor="left"
				width="80px"
			>
				<Navigation />
			</DrawerCustom>
		</>
	);
}

export default SideBar;
