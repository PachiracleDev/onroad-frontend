import { createContext, useContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMyProfile } from "@/services/api/auth";
import Loader from "@/components/shared/Loader";

const initialState: StateT = {
	user: null,
	isAuthenticated: false,
	loadingInitial: false,
};

type StateT = {
	user: {
		email: string;
		id: number;
		role: "onroad" | "user";
		name: string;
	} | null;
	isAuthenticated: boolean;
	loadingInitial: boolean;
};

export enum ActionType {
	SIGNIN_SUCCESS = "SIGNIN_SUCCESS",
	SET_LOADING_INITIAL = "SET_LOADING_INITIAL",
	LOGOUT = "LOGOUT",
	GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS",
}

interface ActionT {
	payload?: any;
	type: ActionType;
}

const reducer = (state: StateT, action: ActionT) => {
	switch (action.type) {
		case ActionType.SIGNIN_SUCCESS:
			Cookies.set("access", action.payload.access_token);

			return {
				...state,
				isAuthenticated: true,
				loadingInitial: false,
			};
		case ActionType.SET_LOADING_INITIAL:
			return {
				...state,
				loadingInitial: true,
			};

		case ActionType.GET_PROFILE_SUCCESS:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loadingInitial: false,
			};

		case ActionType.LOGOUT:
			Cookies.remove("access");
			return {
				...state,
				user: null,
				isAuthenticated: false,
				loadingInitial: false,
			};
		default:
			return state;
	}
};

const AuthStateContext = createContext({
	state: initialState,
	dispatch: (action: ActionT) => {},
});

export const useAuthStore = () => useContext(AuthStateContext);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { dispatch } = useAuthStore();
	const { data, status, isLoading, error } = useMyProfile();

	const accessToken = Cookies.get("access");

	useEffect(() => {
		if (status === "success" && data) {
			dispatch({
				type: ActionType.GET_PROFILE_SUCCESS,
				payload: data,
			});
		}
	}, [data, status, dispatch]);

	if (isLoading && !data) {
		return <Loader />;
	}

	if (!data || !!error || !accessToken) {
		return <Redirect />;
	}

	return <>{children}</>;
};

const Redirect = () => {
	const router = useRouter();
	useEffect(() => {
		router.push("/auth/signin");
	}, [router]);
	return <Loader />;
};

function AuthStore({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AuthStateContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AuthStateContext.Provider>
	);
}

export default AuthStore;
