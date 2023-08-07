import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { mapColors } from "../styles/colors";

function StyledThemeProvider({ children }: { children: React.ReactNode }) {
	const darkTheme = {
		palette: {
			mode: "dark" as const,
			text: {
				primary: "#FAFAFA",
				secondary: "#B5B5B5",
				disabled: "#838383",
			},
			secondary: {
				main: "#212121",
			},
			primary: {
				main: "#fdd835",
				dark: "#fdd835",
				light: "#fdd835",
				contrastText: "#212121",
			},
			error: {
				main: "#f44336",
				dark: "#d32f2f",
				light: "#e57373",
				contrastText: "#FAFAFA",
			},
			warning: {
				main: "#ffa726",
				dark: "#f57c00",
				light: "#ffb74d",
				contrastText: "#212121",
			},
			info: {
				main: "#29b6f6",
				dark: "#0288d1",
				light: "#4fc3f7",
				contrastText: "#212121",
			},
			success: {
				main: "#66bb6a",
				dark: "#388e3c",
				light: "#81c784",
				contrastText: "#212121",
			},
			action: {
				active: "#FAFAFA",
				activatedOpacity: 0.24,
				hover: "#212121",
				hoverOpacity: 0.1,
				selected: "#fdd835",
				selectedOpacity: 0.16,
				focus: "#fdd835",
				focusOpacity: 0.12,
				disabled: "#838383",
				disabledOpacity: 0.38,
				disabledBackground: "#212121",
			},
			background: {
				default: "#080808",
				paper: "#080808",
				dark: "#151515",
				light: "#212121",
				transparent: "rgba(0, 0, 0, 0)",
				blur: "rgba(0, 0, 0, 0.65)",
			},
			common: {
				black: "#080808",
				white: "#FAFAFA",
			},
			map: {
				...mapColors,
			},
		},
		components: {
			MuiMenu: {
				styleOverrides: {
					list: {
						backgroundColor: "#151515",
						"& .Mui-selected": {
							backgroundColor: "#212121" + "!important",
						},
					},
				},
			},
		},
		typography: {
			fontSize: 14,
			fontFamily: "Roboto",
			overrides: {
				MuiMenu: {
					list: {
						fontSize: 14,
					},
				},
			},
		},
	};

	const theme = createTheme({ ...darkTheme });

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default StyledThemeProvider;
