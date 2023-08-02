"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik} from "formik";
import Link from "next/link";
import * as Yup from "yup";
import FormPasswordInput from "../../../components/forms/FormPasswordInput";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";

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
				onSubmit={() => {}}>
				<Card sx={{padding: 5, margin: {xs: 4}}}>
					<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
						SIGN UP
					</Typography>

					<FormTextField placeholder="First Name" name="first_name" />
					<FormTextField placeholder="Last Name" name="last_name" sx={{mt: 4}} />
					<FormTextField placeholder="Email" name="email" sx={{mt: 4}} />

					<FormPasswordInput
						name="password"
						placeholder="Password"
						sx={{width: "100%", marginTop: 4}}
					/>
					<FormPasswordInput
						name="password_confirmation"
						placeholder="Confirm Password"
						sx={{width: "100%", marginTop: 4}}
					/>

					<div style={{display: "flex", justifyContent: "flex-end"}}></div>
					<SubmitButton sx={{width: "100%", my: 3}}>Register</SubmitButton>
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
