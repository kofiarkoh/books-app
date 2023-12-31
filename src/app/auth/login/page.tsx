"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik, FormikHelpers} from "formik";
import Link from "next/link";
import * as Yup from "yup";
import FormPasswordInput from "../../../components/forms/FormPasswordInput";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";
import {use, useState, useEffect} from "react";
import {useAppDispatch} from "@/redux/store";
import {POST} from "../../../api/base";
import {showSnackBar} from "../../../redux/snackbarSlice";
import {
	setBearerToken,
	setLoginState,
	setUserInfo,
} from "../../../redux/loginSlice";
import {routes} from "../../../routes";
import {useRouter} from "next/navigation";

const valdiationSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	password: Yup.string().required(),
});
export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleLogin = async (data: any, helpers: FormikHelpers<any>) => {
		if (loading) {
			return;
		}

		setLoading(true);
		let response = await POST("auth/login", data);
		setLoading(false);
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
		dispatch(setLoginState(true));
		router.push(routes.books);
	};

	useEffect(() => {
		document.title = "Login";
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
				initialValues={{email: "", password: ""}}
				validationSchema={valdiationSchema}
				validateOnBlur={false}
				validateOnMount={false}
				validateOnChange={false}
				onSubmit={handleLogin}>
				<Card sx={{padding: 5, margin: {xs: 4}}}>
					<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
						Welcome Back
					</Typography>

					<FormTextField
						placeholder="Email"
						name="email"
						aria-label="your account email"
					/>
					<FormPasswordInput
						name="password"
						placeholder="Password"
						aria-label="your account password"
						sx={{width: "100%", marginTop: 4}}
					/>

					<div style={{display: "flex", justifyContent: "flex-end"}}>
						<Link href={routes.findAccount} style={{textDecoration: "none"}}>
							<Typography pl={2}>Forgot Password?</Typography>
						</Link>
					</div>
					<SubmitButton
						loading={loading}
						aria-label="login button"
						sx={{width: "100%", my: 3}}>
						Log In
					</SubmitButton>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Typography>Don&apos;t have an account?</Typography>
						<Link href="/auth/register" style={{textDecoration: "none"}}>
							<Typography pl={2}> Sign Up</Typography>
						</Link>
					</div>
				</Card>
			</Formik>
		</div>
	);
}
