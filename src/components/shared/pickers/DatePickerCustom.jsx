import React, { memo } from "react";

import { DateTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

const useStyles = () => ({
	root: (theme) => ({
		fontSize: "14px",
		// Input Label
		"& label": {
			color: theme.palette.grey[600],
			fontWeight: "bold",
			fontSize: "14px",
		},
		// Focused Input Label
		"& label.Mui-focused": {
			fontWeight: "normal",
		},
	}),
	input: (theme) => ({
		fontSize: "14px", // Set your desired font size for the label
		"&:before": {
			borderBottom: "1px solid " + theme.palette.grey[800],
		},
		"&:hover:not(.Mui-disabled):before": {
			borderBottom: "1px solid " + theme.palette.grey[600],
		},
		"&:after": {
			borderBottom: "1px solid " + theme.palette.primary.main,
		},
	}),
	label: {
		fontSize: "14px",
	},
	helper: (theme) => ({
		fontSize: "12px",
		color: theme.palette.grey[600],
		fontWeight: "bold",
	}),
});

const DatePickerCustom = ({
	views,
	label,
	onChange,
	value,
	minDate,
	maxDate,
}) => {
	const styles = useStyles();
	return (
		<DateTimePicker
			views={views}
			label={label}
			onChange={onChange}
			value={value}
			minDate={minDate}
			maxDate={maxDate}
			renderInput={(props) => <TextField sx={styles.input} {...props} />}
			sx={(theme) => ({
				...styles.root(theme),
			})}
			slotProps={{
				textField: {
					variant: "standard",
					InputProps: {
						sx: {
							fontSize: "0.875rem",
						},
					},
				},
			}}
		/>
	);
};

export default memo(DatePickerCustom);
