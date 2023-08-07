import TextField from "@mui/material/TextField";
import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const useStyles = () => ({
	root: (theme: any) => ({
		fontSize: "14px",
		// Input Label
		"& label": {
			color: theme.palette.grey[600],
			fontWeight: "bold",
		},
		// Focused Input Label
		"& label.Mui-focused": {
			fontWeight: "normal",
		},
	}),
	input: (theme: any) => ({
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
	helper: (theme: any) => ({
		fontSize: "12px",
		color: theme.palette.grey[600],
		fontWeight: "bold",
	}),
});

const BaseTextField = forwardRef(function B(
	{
		fullWidth = true,
		disabled = false,
		size = "medium",
		id,
		name,
		required = false,
		label,
		placeholder,
		errors = null,
		helperText,
		onChange,
		onBlur,
		variant = "standard",
		sx,
		onKeyDown,
		type = "text",
		...rest
	}: {
		fullWidth?: boolean;
		disabled?: boolean;
		size?: "small" | "medium";
		id?: string;
		name?: string;
		required?: boolean;
		label?: string;
		placeholder?: string;
		errors?: any;
		helperText?: string;
		onChange?: any;
		onBlur?: any;
		variant?: "standard" | "filled" | "outlined";
		sx?: any;
		type?: string;
		onKeyDown?: any;
	},
	ref
) {
	const styles = useStyles();

	return (
		<TextField
			{...rest}
			id={id}
			ref={ref as any}
			name={name}
			required={required}
			fullWidth={fullWidth}
			disabled={disabled}
			size={size}
			type={type}
			onKeyDown={onKeyDown}
			placeholder={placeholder}
			onChange={onChange}
			onBlur={onBlur}
			label={label}
			variant={variant}
			error={errors ? true : false}
			helperText={errors?.message || helperText}
			FormHelperTextProps={{ sx: styles.helper }}
			InputLabelProps={{ sx: styles.label }}
			InputProps={{ sx: styles.input }}
			sx={(theme) => ({
				...styles.root(theme),
				...(typeof sx === "function" ? sx(theme) : sx),
			})}
		/>
	);
});

export default BaseTextField;
