import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "../context/Providers";
import Layout from "@/layout/admin";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<Layout>
					<Component {...pageProps} />
					<ToastContainer theme="dark" />
				</Layout>
			</LocalizationProvider>
		</Providers>
	);
}
