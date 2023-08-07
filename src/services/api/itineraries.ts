import { toast } from "react-toastify";
import { api } from ".";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SeatTypeEnum } from "./cart";

const getItineraries = async () => {
	const response = await api.get("/itineraries");
	return response.data;
};

type CreateItinerarieDto = {
	closingTime: string;
	openingTime: string;
	baseTicketPrice: number;
	origin: string;
	destination: string;
	bus: number;
};

const createItinerarie = async (body: CreateItinerarieDto) => {
	const response = await api.post("/itineraries/create", body);
	return response.data;
};

export type ItinerarieType = {
	id: number;
	bus: {
		imageUrl: string;
		porcentageIncreaseSeatType: Record<SeatTypeEnum, number>;
	};
	closingTime: string;
	openingTime: string;
	baseTicketPrice: string;
	origin: string;
	destination: string;
	seats: {
		type: SeatTypeEnum;
		number: number;
		occupied: boolean;
	}[];
};

export const useGetItineraries = () => {
	return useQuery<ItinerarieType[]>({
		queryFn: getItineraries,
		queryKey: ["itineraries"],
	});
};

export const useCreateItinerarie = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (variables: CreateItinerarieDto) => createItinerarie(variables),
		onSuccess: (data) => {
			toast.success("Itinerarie created");
			const oldData = client.getQueryData<ItinerarieType[]>(["itineraries"]);
			if (oldData) {
				client.setQueryData<ItinerarieType[]>(
					["itineraries"],
					[...oldData, data]
				);
			}
		},
	});
};
