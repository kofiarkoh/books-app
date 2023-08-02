import LoadingButton, {LoadingButtonProps} from "@mui/lab/LoadingButton";
import {useFormikContext} from "formik";

export default function SubmitButton(props: LoadingButtonProps) {
	const {submitForm} = useFormikContext();
	return (
		<LoadingButton
			variant="contained"
			disableElevation
			{...props}
			sx={{
				transition: "background 1s, color 1s",
				color: "white",
				backgroundColor: "primary.main",
				width: "60%",
				height: "50px",
				borderRadius: "10px",
				textTransform: "capitalize",
				borderColor: "transparent",

				...props.sx,
			}}
			onClick={submitForm}>
			{props.children}
		</LoadingButton>
	);
}
