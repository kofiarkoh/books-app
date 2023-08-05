"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik, FormikHelpers, FormikProps, FormikValues} from "formik";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import * as Yup from "yup";
import {PATCH} from "../../../api/base";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";
import {showSnackBar} from "../../../redux/snackbarSlice";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {updateBookInState} from "../../../redux/booksSlice";
import {routes} from "@/routes";
import Link from "next/link";

const valdiationSchema = Yup.object().shape({
	title: Yup.string().required(),
	description: Yup.string().required(),
	author_name: Yup.string().required(),
});
export default function EditBookDetails() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const formikRef = useRef<FormikProps<FormikValues>>(null);
	const {bookToEdit} = useAppSelector((state) => state.booksState);

	const updateBook = async (data: any, helpers: FormikHelpers<any>) => {
		if (loading) {
			return;
		}

		setLoading(true);
		let response = await PATCH(`books/${bookToEdit?.uuid}`, data);
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
		dispatch(updateBookInState(response.msg.data));
		router.push("/books");
	};

	useEffect(() => {
		if (bookToEdit === null) {
			router.push("/books");
		}
		formikRef.current?.setValues(bookToEdit);
	}, [bookToEdit]);

	useEffect(() => {
		document.title = "Edit Book Details";
	}, []);
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
					innerRef={(r) => {
						formikRef.current = r;
					}}
					initialValues={{
						title: "",
						description: "",
						author_name: "",
					}}
					validationSchema={valdiationSchema}
					validateOnBlur={false}
					validateOnMount={false}
					validateOnChange={false}
					onSubmit={updateBook}>
					<Card sx={{padding: 5, margin: {xs: 4}}}>
						<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
							Edit Book Details
						</Typography>

						<FormTextField
							label="Title"
							placeholder="Title"
							name="title"
							sx={{width: "100%", marginTop: 4}}
							aria-label="book title"
						/>

						<FormTextField
							label="Description"
							placeholder="Description"
							name="description"
							sx={{width: "100%", marginTop: 4}}
							multiline
							aria-label="book description"
						/>
						<FormTextField
							label="Author Name"
							placeholder="author name"
							name="author_name"
							sx={{width: "100%", marginTop: 4}}
							aria-label="name of author"
						/>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "column",
							}}>
							<SubmitButton loading={loading} sx={{width: "100%", my: 3}}>
								Update Book Details
							</SubmitButton>
							<Link href={routes.books}>Go Back To View Books</Link>
						</div>
					</Card>
				</Formik>
			</div>
		</>
	);
}
