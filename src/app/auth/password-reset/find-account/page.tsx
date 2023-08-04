"use client";
import {POST} from "@/api/base";
import FormTextField from "@/components/forms/FormTextField";
import SubmitButton from "@/components/forms/SubmitButton";
import {showSnackBar} from "@/redux/snackbarSlice";
import {useAppDispatch} from "@/redux/store";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik, FormikHelpers} from "formik";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import * as Yup from "yup";
import {routes} from "../../../../routes";

const valdiationSchema = Yup.object().shape({
	email: Yup.string().email().required(),
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
		let response = await POST("auth/forgot-password", data);
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

		sessionStorage.setItem("password_reset_email", data.email);
		router.push(routes.verifyPasswordResetEmail);
	};

	useEffect(() => {
		document.title = "Find Your Account";
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
				initialValues={{email: ""}}
				validationSchema={valdiationSchema}
				validateOnBlur={false}
				validateOnMount={false}
				validateOnChange={false}
				onSubmit={findAccount}>
				<Card sx={{padding: 5, margin: {xs: 4}}}>
					<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
						Find Your Account
					</Typography>

					<FormTextField placeholder="Email" name="email" />

					<SubmitButton loading={loading} sx={{width: "100%", my: 3}}>
						Submit
					</SubmitButton>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Typography>Remember your credentials?</Typography>
						<Link href="/auth/login" style={{textDecoration: "none"}}>
							<Typography pl={2}> Sign In Here</Typography>
						</Link>
					</div>
				</Card>
			</Formik>
		</div>
	);
}
