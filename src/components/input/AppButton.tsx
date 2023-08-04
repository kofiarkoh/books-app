import React from "react";
import LoadingButton, {LoadingButtonProps} from "@mui/lab/LoadingButton";

export default function AppButton(props: LoadingButtonProps) {
	return (
		<LoadingButton
			disableElevation
			{...props}
			sx={{
				transition: "background 1s, color 1s",

				width: "60%",
				height: "50px",
				borderRadius: "10px",
				textTransform: "capitalize",
				borderColor: "transparent",

				...props.sx,
			}}>
			{props.children}
		</LoadingButton>
	);
}
