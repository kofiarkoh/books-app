"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik, FormikHelpers} from "formik";
import {useState} from "react";
import * as Yup from "yup";
import {POST} from "../../../api/base";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";
import {showSnackBar} from "../../../redux/snackbarSlice";
import {useAppDispatch} from "../../../redux/store";

const valdiationSchema = Yup.object().shape({
	title: Yup.string().required(),
	description: Yup.string().required(),
	author_name: Yup.string().required(),
});
export default function AddBookDetails() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();

	const saveBookDetails = async (data: any, helpers: FormikHelpers<any>) => {
		if (loading) {
			return;
		}

		setLoading(true);
		let response = await POST("books", data);
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
	};
	return (
		<>
			<div
				style={{
					backgroundColor: "rgb(243, 245, 249)",
					height: " 97vh",
					width: "100%",
					padding: "0px",
					margin: "0px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Formik
					initialValues={{
						title: "",
						description: "",
						author_name: "",
					}}
					validationSchema={valdiationSchema}
					validateOnBlur={false}
					validateOnMount={false}
					validateOnChange={false}
					onSubmit={saveBookDetails}>
					<Card sx={{padding: 5, margin: {xs: 4}}}>
						<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
							Book Details
						</Typography>

						<FormTextField
							label="Title"
							placeholder="Title"
							name="title"
							sx={{width: "100%", marginTop: 4}}
						/>

						<FormTextField
							label="Description"
							placeholder="Description"
							name="description"
							sx={{width: "100%", marginTop: 4}}
							multiline
						/>
						<FormTextField
							label="Author Name"
							placeholder="author name"
							name="author_name"
							sx={{width: "100%", marginTop: 4}}
						/>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
							}}></div>
						<SubmitButton loading={loading} sx={{width: "100%", my: 3}}>
							Save Book Details
						</SubmitButton>
					</Card>
				</Formik>
			</div>
		</>
	);
}
