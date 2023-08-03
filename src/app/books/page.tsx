"use client";
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import {Button, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../redux/store";
import {Book, removeBook, updateBooks} from "../../redux/booksSlice";
import {showSnackBar} from "../../redux/snackbarSlice";
import {DELETE, GET} from "../../api/base";
import BookItem, {BookItemSkeleton} from "../../components/BookItem";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function AddTaskDetails() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const {user} = useAppSelector((state) => state.loginState);
	const {books} = useAppSelector((state) => state.booksState);
	const router = useRouter();

	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
	const bookToDeletRef = useRef<Book>(null);

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
		router.push("/books/create");
	};

	const triggerBookDelete = (book: Book) => {
		bookToDeletRef.current = book;
		setDeleteDialogVisible(true);
	};

	const closeDeleteDialog = () => {
		bookToDeletRef.current = null;
		setDeleteDialogVisible(false);
	};
	const deleteBook = async () => {
		setDeleteDialogVisible(false);
		let uuid = bookToDeletRef.current?.uuid;
		if (loading) {
			return;
		}
		setLoading(true);

		let response = await DELETE(`books/${uuid}`);
		setLoading(false);

		if (response.is_error) {
			closeDeleteDialog();
			return;
		}
		dispatch(
			showSnackBar({
				message: response.msg.message ? response.msg.message : "An error occured",
				severity: response.is_error ? "error" : "success",
			})
		);
		dispatch(removeBook(uuid));
		closeDeleteDialog();
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
						<>
							<Grid item sm={12} md={6} lg={4}>
								<BookItemSkeleton />
							</Grid>
							<Grid item sm={12} md={6} lg={4}>
								<BookItemSkeleton />
							</Grid>
							<Grid item sm={12} md={6} lg={4}>
								<BookItemSkeleton />
							</Grid>
						</>
					) : (
						<>
							{books.map((item) => {
								return (
									<Grid key={item.uuid} item sm={12} md={6} lg={4}>
										<BookItem book={item} onDelete={triggerBookDelete} />
									</Grid>
								);
							})}
						</>
					)}
				</Grid>
			</div>
			<ConfirmDialog
				onAccept={deleteBook}
				onCancel={closeDeleteDialog}
				title={"Do you want to delete the book record with this title?"}
				message={bookToDeletRef.current ? bookToDeletRef.current.title : ""}
				visible={deleteDialogVisible}
				isloading={false}
			/>
		</>
	);
}
