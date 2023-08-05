"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik, FormikHelpers} from "formik";
import Link from "next/link";
import * as Yup from "yup";
import FormPasswordInput from "../../../components/forms/FormPasswordInput";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";
import {useState, useEffect} from "react";
import {POST} from "../../../api/base";
import {useAppDispatch} from "../../../redux/store";
import {showSnackBar} from "../../../redux/snackbarSlice";
import {setBearerToken, setLoginState, setUserInfo} from "@/redux/loginSlice";
import {useRouter} from "next/navigation";
import {routes} from "../../../routes";

const valdiationSchema = Yup.object().shape({
	first_name: Yup.string().required(),
	last_name: Yup.string().required(),
	email: Yup.string().email().required(),
	password: Yup.string().min(5).max(15).required(),
	password_confirmation: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords do not match")
		.required(),
});

export default function RegistrationPage() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleRegister = async (data: any, helpers: FormikHelpers<any>) => {
		if (loading) {
			return;
		}

		setLoading(true);
		let response = await POST("auth/register", data);
		setLoading(false);
		console.log(response);
		if (response.is_error) {
			if (response.code === 422) {
				helpers.setErrors(response.msg.errors);
				return;
			}

			dispatch(
				showSnackBar({
					message: response.msg.message ? response.msg.message : "An error occured",
					severity: response.is_error ? "error" : "success",
				})
			);
			return;
		}

		dispatch(
			showSnackBar({
				message: response.msg.message,
				severity: "success",
			})
		);

		let user = response.msg.data;
		let token = response.msg.meta.token;
		sessionStorage.setItem("user_info", JSON.stringify(user));
		sessionStorage.setItem("bearer_token", token);
		dispatch(setUserInfo(user));
		dispatch(setBearerToken(token));
		router.push(routes.verifySignUpEmail);
		//dispatch(setLoginState(true));
	};

	useEffect(() => {
		document.title = "Sign Up";
	}, []);
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
				initialValues={{
					first_name: "",
					last_name: "",
					email: "",
					password: "",
					password_confirmation: "",
				}}
				validationSchema={valdiationSchema}
				validateOnBlur={false}
				validateOnMount={false}
				validateOnChange={false}
				onSubmit={handleRegister}>
				<Card sx={{padding: 5, margin: {xs: 4}}}>
					<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
						SIGN UP
					</Typography>

					<FormTextField
						placeholder="First Name"
						aria-label="first name"
						name="first_name"
					/>
					<FormTextField
						placeholder="Last Name"
						aria-label="last name"
						name="last_name"
						sx={{mt: 4}}
					/>
					<FormTextField
						placeholder="Email"
						aria-label="email"
						name="email"
						sx={{mt: 4}}
					/>

					<FormPasswordInput
						name="password"
						placeholder="Password"
						sx={{width: "100%", marginTop: 4}}
						aria-label="password"
					/>
					<FormPasswordInput
						name="password_confirmation"
						placeholder="Confirm Password"
						aria-label="confirm your password"
						sx={{width: "100%", marginTop: 4}}
					/>

					<div style={{display: "flex", justifyContent: "flex-end"}}></div>
					<SubmitButton
						aria-label="register button"
						sx={{width: "100%", my: 3}}
						loading={loading}>
						Register
					</SubmitButton>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Typography>Already have an account?</Typography>
						<Link href="/auth/login" style={{textDecoration: "none"}}>
							<Typography pl={2}>Login</Typography>
						</Link>
					</div>
				</Card>
			</Formik>
		</div>
	);
}
