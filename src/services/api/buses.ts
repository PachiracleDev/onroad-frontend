import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from ".";
import { toast } from "react-toastify";
import { Seat, SeatTypeEnum } from "./cart";

const getBuses = async () => {
	const response = await api.get("/bus");
	return response.data;
};

type CreateDto = {
	carPlate: string;
	imageUrl: string;
	operator: number;
	porcentageIncreaseSeatType: Record<SeatTypeEnum, number>;
	seats: Seat[];
};

const createBus = async (data: CreateDto) => {
	const response = await api.post("/bus/create", data);
	return response.data;
};

export const uploadImageBus = async (file: File) => {
	const formData = new FormData();
	formData.append("file", file);
	const response = await api.post("/aws-s3/bus", formData);
	return response.data;
};

type BusType = {
	id: string;
	carPlate: string;
	imageUrl: string;
	operator: {
		id: string;
		name: string;
		phone: string;
	};
};

export const useGetBuses = () => {
	return useQuery<BusType[]>({
		queryFn: getBuses,
		queryKey: ["buses"],
		refetchOnWindowFocus: false,
	});
};

export const useCreateBus = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (variables: CreateDto) => createBus(variables),
		onSuccess: (data: any) => {
			toast.success("Bus created successfully");

			const oldData = client.getQueryData<BusType[]>(["buses"]);
			if (oldData) {
				client.setQueryData<BusType[]>(["buses"], [...oldData, data]);
			}
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});
};
