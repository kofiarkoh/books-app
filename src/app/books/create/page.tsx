"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik} from "formik";
import * as Yup from "yup";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";

const valdiationSchema = Yup.object().shape({
	title: Yup.string().required(),
	description: Yup.string().required(),
	author_name: Yup.string().required(),
});
export default function AddBookDetails() {
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
					onSubmit={() => {}}>
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
						<SubmitButton sx={{width: "100%", my: 3}}>Save Book Details</SubmitButton>
					</Card>
				</Formik>
			</div>
		</>
	);
}
