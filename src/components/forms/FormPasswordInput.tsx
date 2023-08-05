import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import {useField} from "formik";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type FormikInputProps = {
	name: string;
};
type FormTextFieldProps = FormikInputProps & TextFieldProps;

export default function FormPasswordInput(props: FormTextFieldProps) {
	const [show, setShow] = useState(false);
	const [field, meta, helpers] = useField(props.name);

	const toggleVisibility = () => {
		setShow(!show);
	};
	return (
		<TextField
			label={props.label}
			error={meta.error ? true : false}
			onChange={(e) => helpers.setValue(e.target.value)}
			helperText={meta.error ? meta.error : null}
			sx={{
				width: "100%",
				backgroundColor: "white",

				...props.sx,
			}}
			type={show ? "text" : "password"}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={toggleVisibility}
							edge="end">
							{show ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
				sx: {
					height: "55px",
					borderRadius: "10px",
				},
			}}
			{...props}
		/>
	);
}
