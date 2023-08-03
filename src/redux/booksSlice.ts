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

		removeBook: (state, {payload}) => {
			state.books = state.books.filter((i) => i.uuid !== payload);
		},
	},
});

export const {updateBooks, removeBook} = booksSlice.actions;

export default booksSlice.reducer;
