import { SeatTypeEnum } from "@/services/api/cart";

export const calculatePrice = (
	priceBase: number,
	seatype: SeatTypeEnum,
	porcentageIncreaseSeatType: Record<SeatTypeEnum, number>
) => {
	console.log(priceBase, seatype, porcentageIncreaseSeatType);
	return (priceBase * porcentageIncreaseSeatType[seatype]).toFixed(2);
};
