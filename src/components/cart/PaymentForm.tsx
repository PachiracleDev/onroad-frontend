import { CartItemType, useCreatePaymentIntent } from "@/services/api/cart";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import {
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
	Elements,
} from "@stripe/react-stripe-js";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import BaseButton from "../shared/buttons/BaseButton";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [email, setEmail] = useState<null | string>("");
	const [message, setMessage] = useState<null | string>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			if (!paymentIntent) return;
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error }: any = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/my-reservations`,
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs" as const,
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<LinkAuthenticationElement
				id="link-authentication-element"
				onChange={(e: any) => setEmail(e.target.value)}
			/>
			<PaymentElement id="payment-element" options={paymentElementOptions} />
			<BaseButton
				variant="contained"
				color="primary"
				type="submit"
				onClick={handleSubmit}
				fullWidth
				disabled={!stripe || isLoading}
				sx={{ marginTop: "20px", padding: "10px" }}
			>
				{isLoading ? <CircularProgress size={25} /> : "PAY"}
			</BaseButton>
			{/* Show any error or success messages */}
			{message && (
				<div className="text-red-400 text-sm p-3" id="payment-message">
					{message}
				</div>
			)}
		</form>
	);
}

function PaymentForm({ cart }: { cart: CartItemType[] }) {
	const [clientSecret, setClientSecret] = useState("");

	const items = cart.map((item) => ({
		itinerarieId: item.itinerarie.id,
		seats: item.seats,
	}));

	const { data, isLoading, status } = useCreatePaymentIntent(items);

	useEffect(() => {
		if (status === "success") {
			setClientSecret(data.clientSecret);
		}
	}, [data, status]);

	const appearance = {
		theme: "night" as const,
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<Box>
			<Typography
				color="primary"
				fontWeight="bold"
				sx={{ marginBottom: "10px" }}
				variant="h6"
			>
				Payment
			</Typography>
			{isLoading && <CircularProgress sx={{ marginY: "40px" }} size={25} />}
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					{!isLoading && <CheckoutForm />}
				</Elements>
			)}
		</Box>
	);
}

export default PaymentForm;
