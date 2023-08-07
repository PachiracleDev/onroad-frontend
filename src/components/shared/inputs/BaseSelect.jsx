import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";

const useStyles = () => ({
	root: (theme) => ({
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
	sxStyle: {
		height: "26px",
		display: "flex",
		alignItems: "center",
	},
	menuItem: {
		justifyContent: "space-between",
		width: "250px",
	},
});

const BaseSelect = ({
	control,
	size,
	id,
	name,
	variant,
	disabled,
	displayEmpty,
	fullWidth,
	label,
	required,
	placeholder,
	onChange,
	value,
	options,
	errors,
	sx,
	...rest
}) => {
	return (
		<FormControl
			id={id}
			size={size === "xsmall" ? "small" : size}
			name={name}
			variant={variant}
			required={required}
			fullWidth={fullWidth}
			error={errors ? true : false}
			disabled={disabled}
		>
			{label && (
				<InputLabel
					sx={(theme) => ({
						fontSize: "14px",
						color: theme.palette.grey[600],
						fontWeight: "bold",
						// Focused Input Label
						"&.Mui-focused": {
							fontWeight: "normal", // Set the font weight for the focused label
						},
					})}
					required={required}
				>
					{label}
				</InputLabel>
			)}
			{control && (
				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, value } }) =>
						renderSelect({
							displayEmpty,
							placeholder,
							onChange,
							value,
							options,
							size,
							sx,
							...rest,
						})
					}
				/>
			)}
			{!control &&
				renderSelect({
					displayEmpty,
					placeholder,
					onChange,
					value,
					options,
					size,
					sx,
					...rest,
				})}
			{errors?.message && <FormHelperText>{errors.message}</FormHelperText>}
		</FormControl>
	);
};

const renderSelect = ({
	options,
	displayEmpty,
	placeholder,
	onChange,
	value,
	size,
	sx,
	...rest
}) => {
	const styles = useStyles();
	return (
		<Select
			{...rest}
			sx={(theme) => ({
				...styles.root(theme),
				...(typeof sx === "function" ? sx(theme) : sx),
				...(size === "xsmall" ? styles.sxStyle : {}),
			})}
			placeholder={placeholder}
			displayEmpty={displayEmpty}
			onChange={onChange}
			value={value}
		>
			{options.map((o) => (
				<MenuItem key={o.value} value={o.value} sx={styles.menuItem}>
					<Typography variant="body2">{o.label}</Typography>
				</MenuItem>
			))}
		</Select>
	);
};

BaseSelect.defaultProps = {
	fullWidth: false,
	displayEmpty: false,
	required: false,
	disabled: false,
	size: "medium",
	id: "",
	name: "",
	label: undefined,
	placeholder: "",
	errors: null,
	onChange: () => {},
	variant: "standard",
	options: [],
	inputProps: {},
	sx: {},
};

BaseSelect.propTypes = {
	control: PropTypes.any,
	id: PropTypes.string,
	name: PropTypes.string,
	fullWidth: PropTypes.bool,
	displayEmpty: PropTypes.bool,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	size: PropTypes.oneOf(["xsmall", "small", "medium", "large"]),
	label: PropTypes.string,
	placeholder: PropTypes.string,
	errors: PropTypes.object,
	value: PropTypes.any,
	onChange: PropTypes.func,
	variant: PropTypes.string,
	options: PropTypes.array,
	inputProps: PropTypes.object,
	sx: PropTypes.object,
};

BaseSelect.displayName = "BaseSelect";

export default BaseSelect;
