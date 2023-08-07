import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from ".";
import { toast } from "react-toastify";

type ResponseCreateIntent = {
	clientSecret: string;
};

const getCart = async () => {
	const response = await api.get("/cart/get-cart");
	return response.data;
};

export enum SeatTypeEnum {
	TURISTA = "tourist",
	EJECUTIVO = "executive",
	PREMIUM = "premium",
}

export interface Seat {
	number: number;
	type: SeatTypeEnum;
}

export interface SeatOpen extends Seat {
	occupied: boolean;
}

export type CartItemType = {
	id: number;
	itinerarie: {
		id: number;
		closingTime: Date;
		openingTime: Date;
		baseTicketPrice: number;
		origin: string;
		destination: string;
		porcentageIncreaseSeatType: Record<SeatTypeEnum, number>;
	};
	seats: Seat[];
};

export type CartType = {
	id: number;
	items: CartItemType[];
};

const addItem = async (item: {
	itemId: number;
	seats: {
		number: number;
		type: SeatTypeEnum;
	}[];
}) => {
	const response = await api.post("/cart/add-item-to-cart", item);
	return response.data;
};

const createPaymentIntent = async (
	items: { itemId: number; seatType: SeatTypeEnum; quantity: number }[]
) => {
	const response = await api.post("/payments/create-payment-intent", {
		items,
	});
	return response.data;
};

const removeItem = async (itemId: number) => {
	const response = await api.delete(`/cart/remove-item-from-cart/`, {
		data: { itemId },
	});
	return response.data;
};

const clearCart = async () => {
	const response = await api.delete("/cart/clear-cart");
	return response.data;
};

export const useGetCart = () => {
	return useQuery<CartType>({
		queryFn: getCart,
		queryKey: ["cart"],
		refetchOnWindowFocus: false,
	});
};

export const useAddItem = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: addItem,
		onSuccess: (data: CartItemType[]) => {
			const oldData = client.getQueryData<CartType>(["cart"]);
			if (oldData) {
				client.setQueryData<CartType>(["cart"], {
					...oldData,
					items: data,
				});
				toast.success("Reservation added to cart");
			}
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});
};

export const useRemoveItem = (itemId: number) => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: removeItem,
		onSuccess: () => {
			const oldData = client.getQueryData<CartType>(["cart"]);
			if (oldData) {
				client.setQueryData<CartType>(["cart"], {
					...oldData,
					items: oldData.items.filter((item) => item.id !== itemId),
				});
				toast.success("Reservation removed from cart");
			}
		},
	});
};

export const useCreatePaymentIntent = (items: any) => {
	return useQuery<ResponseCreateIntent>({
		queryFn: () => createPaymentIntent(items),
		queryKey: ["paymentIntent"],
	});
};

export const useClearCart = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: clearCart,
		onSuccess: (data: CartItemType[]) => {
			const oldData = client.getQueryData<CartType>(["cart"]);
			if (oldData) {
				client.setQueryData<CartType>(["cart"], {
					...oldData,
					items: [],
				});
				toast.success("Cart cleared");
			}
		},
	});
};
