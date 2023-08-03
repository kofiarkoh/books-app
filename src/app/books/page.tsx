"use client";
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import {Button, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../redux/store";
import {updateBooks} from "../../redux/booksSlice";
import {showSnackBar} from "../../redux/snackbarSlice";
import {GET} from "../../api/base";
import BookItem from "../../components/BookItem";

export default function AddTaskDetails() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const {user} = useAppSelector((state) => state.loginState);
	const {books} = useAppSelector((state) => state.booksState);
	const router = useRouter();

	/**
	 * retrieves all tasks from the api and saves them in redux store
	 * @returns
	 */
	const fetchTasks = async () => {
		if (loading) {
			return;
		}
		setLoading(true);
		let response = await GET("books");

		setLoading(false);
		dispatch(
			showSnackBar({
				message: response.msg.message ? response.msg.message : "An error occured",
				severity: response.is_error ? "error" : "success",
			})
		);
		if (response.is_error) {
			return;
		}
		dispatch(updateBooks(response.msg.data));
	};

	const addBook = () => {
		router.push("/tasks/details");
	};
	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<>
			<div
				style={{
					backgroundColor: "rgb(243, 245, 249)",
					height: "97vh",
					width: "100%",
					padding: "0px",
					margin: "0px",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
				}}>
				<Grid container spacing={4} sx={{padding: "20px"}}>
					<Grid item sm={12} md={12} lg={12}>
						<div
							style={{
								paddingTop: "10px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",

								width: "100%",
							}}>
							<div>
								<Typography variant="h6">Welcome, {user.first_name}</Typography>
								<Typography variant="body1">Here are your saved books </Typography>
							</div>
							<div>
								<Button variant="contained" onClick={addBook}>
									Add New Book
								</Button>
							</div>
						</div>
					</Grid>

					{loading ? (
						<></>
					) : (
						<>
							{books.map((item) => {
								return (
									<Grid key={item.uuid} item sm={12} md={6} lg={4}>
										<BookItem book={item} />
									</Grid>
								);
							})}
						</>
					)}
				</Grid>
			</div>
		</>
	);
}
