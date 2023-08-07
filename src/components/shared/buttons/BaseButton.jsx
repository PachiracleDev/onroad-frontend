import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const styles = {
	root: () => ({
		textTransform: "none",
		minWidth: 0,
		border: "1px solid #ccc",
		borderRadius: "10px",
	}),
};

const BaseButton = ({
	onClick,
	disabled,
	color,
	variant,
	children,
	sx,
	...props
}) => {
	return (
		<Button
			size="small"
			disableElevation
			onClick={onClick}
			disabled={disabled}
			color={color}
			variant={variant}
			{...props}
			sx={(theme) => ({
				...styles.root(theme),
				...(typeof sx === "function" ? sx(theme) : sx),
				color: "#ffff",
				"&:hover": {
					color: variant === "contained" ? "#000" : "#ffff",
					border: "1px solid #fdd835",
				},
			})}
		>
			{children}
		</Button>
	);
};

BaseButton.propTypes = {
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	color: PropTypes.oneOf(["inherit", "primary", "secondary", "error"]),
	variant: PropTypes.oneOf(["text", "outlined", "contained"]),
	children: PropTypes.node.isRequired,
	sx: PropTypes.object,
};

BaseButton.defaultProps = {
	onClick: () => {},
	disabled: false,
	color: "primary",
	variant: "contained",
	sx: {},
};

export default BaseButton;
