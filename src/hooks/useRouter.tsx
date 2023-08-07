import { useRouter } from "next/router";
import React from "react";

function useRouterHook() {
	const router = useRouter();

	const isRoute = (route: string) => router.pathname === route;

	const isChatRoute = isRoute("/panel/chat");
	const isBusesRoute = isRoute("/panel/buses");
	const isOperatorsRoute = isRoute("/panel/operators");
	const isItinerariesRoute = isRoute("/panel/itineraries");
	const isReservationsRoute = isRoute("/panel/reservations");

	const pushChatRoute = () => (window.location.href = "/panel/chat");
	const pushBusesRoute = () => router.push("/panel/buses");
	const pushOperatorsRoute = () => router.push("/panel/operators");
	const pushItinerariesRoute = () => router.push("/panel/itineraries");
	const pushReservationsRoute = () => router.push("/panel/reservations");

	return {
		isChatRoute,
		isBusesRoute,
		isOperatorsRoute,
		isItinerariesRoute,
		isReservationsRoute,
		pushChatRoute,
		pushBusesRoute,
		pushOperatorsRoute,
		pushItinerariesRoute,
		pushReservationsRoute,
	};
}

export default useRouterHook;
