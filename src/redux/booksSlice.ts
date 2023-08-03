import {createSlice} from "@reduxjs/toolkit";
import {stat} from "fs";

export type Book = {
	uuid: string;
	title: string;
	description: string;
	author_name: string;
};

const initialState: {
	books: Book[];
	bookToEdit: Book | null;
} = {
	books: [],
	bookToEdit: null,
};
export const booksSlice = createSlice({
	name: "bookSlice",
	initialState: initialState,
	reducers: {
		updateBooks: (state, {payload}) => {
			state.books = payload;
		},

		removeBook: (state, {payload}) => {
			state.books = state.books.filter((i) => i.uuid !== payload);
		},
		updateBookToEdit: (state, {payload}) => {
			state.bookToEdit = payload;
		},
		updateBookInState: (state, {payload}) => {
			state.books = state.books.map((i) => {
				if (i.uuid !== payload.uuid) {
					return i;
				}
				return payload;
			});
		},
	},
});

export const {updateBooks, removeBook, updateBookToEdit, updateBookInState} =
	booksSlice.actions;

export default booksSlice.reducer;
