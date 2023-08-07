import Cookies from "js-cookie";
import axios from "axios";

export const API_URL =
	process.env.ENV === "production"
		? "https://api.example.com"
		: "http://localhost:4000/v1";

export const API_CHAT_URL =
	process.env.ENV === "production"
		? "https://chat.example.com"
		: "http://localhost:7000";

const axiosInstance = axios.create({
	baseURL: API_URL,
});

const axiosInstanceChat = axios.create({
	baseURL: API_CHAT_URL,
});

axiosInstance.interceptors.request.use((config) => {
	const token = Cookies.get("access");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

axiosInstanceChat.interceptors.request.use((config) => {
	const token = Cookies.get("access");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

export const api = axiosInstance;
export const apiChat = axiosInstanceChat;
