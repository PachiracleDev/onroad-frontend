import { api } from "./";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const createOperator = async (data: { name: string; phone: string }) => {
	const response = await api.post("/operators/create", data);
	return response.data;
};

const getOperators = async () => {
	const response = await api.get("/operators");
	return response.data;
};

export const useCreateOperator = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (data: { name: string; phone: string }) => createOperator(data),
		onSuccess: (data) => {
			toast.success("Operator created");

			const oldData = client.getQueryData<OperatosType[]>(["operators"]);
			if (oldData) {
				client.setQueryData<OperatosType[]>(["operators"], [...oldData, data]);
			}
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});
};

type OperatosType = {
	id: string;
	name: string;
	phone: string;
	createdAt: string;
};

export const useGetOperators = () => {
	return useQuery<OperatosType[]>({
		queryFn: () => getOperators(),
		queryKey: ["operators"],
		refetchOnWindowFocus: false,
	});
};
