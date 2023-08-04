"use client";
import {POST} from "@/api/base";
import SubmitButton from "@/components/forms/SubmitButton";
import {showSnackBar} from "@/redux/snackbarSlice";
import {useAppDispatch} from "@/redux/store";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik, FormikHelpers} from "formik";
import {useRouter} from "next/navigation";
import {useState} from "react";
import * as Yup from "yup";
import FormPasswordInput from "../../../../components/forms/FormPasswordInput";
import {routes} from "../../../../routes";

const valdiationSchema = Yup.object().shape({
	password: Yup.string().required(),
	password_confirmation: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords do not match")
		.required(),
});
export default function Page() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const findAccount = async (data: any, helpers: FormikHelpers<any>) => {
		if (loading) {
			return;
		}

		setLoading(true);
		let _data = {
			...data,
			email: sessionStorage.getItem("password_reset_email"),
			token: sessionStorage.getItem("password_reset_token"),
		};
		let response = await POST("auth/reset-password", _data);
		setLoading(false);

		dispatch(
			showSnackBar({
				message: response.msg.message ? response.msg.message : "An error occured",
				severity: response.is_error ? "error" : "success",
			})
		);

		if (!response.is_error) {
			sessionStorage.removeItem("password_reset_email");
			sessionStorage.removeItem("password_reset_token");
			router.push(routes.login);
		}
	};
	return (
		<div
			style={{
				backgroundColor: "rgb(243, 245, 249)",
				height: "97vh",
				width: "100%",
				padding: "0px",
				margin: "0px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Formik
				initialValues={{password_confirmation: "", password: ""}}
				validationSchema={valdiationSchema}
				validateOnBlur={false}
				validateOnMount={false}
				validateOnChange={false}
				onSubmit={findAccount}>
				<Card sx={{padding: 5, margin: {xs: 4}}}>
					<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
						Reset Your Password
					</Typography>

					<FormPasswordInput placeholder="Password" name="password" />
					<FormPasswordInput
						placeholder="Confirm Password"
						name="password_confirmation"
						sx={{mt: 2, width: "100%"}}
					/>

					<SubmitButton loading={loading} sx={{width: "100%", my: 3}}>
						Submit
					</SubmitButton>
				</Card>
			</Formik>
		</div>
	);
}
