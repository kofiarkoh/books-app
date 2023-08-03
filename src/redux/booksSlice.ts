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
} = {
	books: [],
};
export const booksSlice = createSlice({
	name: "bookSlice",
	initialState: initialState,
	reducers: {
		updateBooks: (state, {payload}) => {
			state.books = payload;
		},
	},
});

export const {updateBooks} = booksSlice.actions;

export default booksSlice.reducer;
