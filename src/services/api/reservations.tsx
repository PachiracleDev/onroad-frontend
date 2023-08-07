import { useQuery } from "@tanstack/react-query";
import { api } from ".";
import { Seat, SeatOpen, SeatTypeEnum } from "./cart";

export enum ReservationStatus {
	PENDING = "pending",
	CONFIRMED = "confirmed",
	CANCELLED = "cancelled",
	COMPLETED = "completed",
	FAILED = "failed",
}

export type MyReservationItemType = {
	id: number;
	status: ReservationStatus;
	createdAt: Date;
	ticketId: string;
	seats: Seat[];
	qrCodeImage: string;
	itinerary: {
		id: number;
		closingTime: Date;
		openingTime: Date;
		seats: SeatOpen[];
		origin: string;
		destination: string;
	};
};

const getMyReservations = async () => {
	const response = await api.get("/reservations/get-my-reservations");
	return response.data;
};

export const useGetMyReservations = () => {
	return useQuery<MyReservationItemType[]>({
		queryFn: getMyReservations,
		queryKey: ["my-reservations"],
	});
};
