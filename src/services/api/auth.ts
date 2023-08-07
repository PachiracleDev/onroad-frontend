import { api } from "./";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const login = async (data: { email: string; password: string }) => {
	const response = await api.post("/users/signin", data);
	return response.data;
};

const register = async (data: {
	name: string;
	email: string;
	password: string;
}) => {
	const response = await api.post("/users/register", data);
	return response.data;
};

const myProfile = async () => {
	const response = await api.get("/users/me");
	return response.data;
};

export const useLogin = () => {
	return useMutation({
		mutationFn: (data: { email: string; password: string }) => login(data),
		onSuccess: (data) => {
			toast.success("Login successful");
		},
		onError: (error: any) => {
			toast.error("Credentials are incorrect");
		},
	});
};

export const useMyProfile = () => {
	return useQuery({
		queryFn: () => myProfile(),
		queryKey: ["my-profile"],
		retry: 0,
		refetchOnWindowFocus: false,
	});
};

export const useRegister = () => {
	return useMutation({
		mutationFn: (data: { name: string; email: string; password: string }) =>
			register(data),
		onSuccess: (data) => {
			toast.success("Register successful");
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});
};
