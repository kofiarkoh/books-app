import {AlertColor} from "@mui/material";
import {createSlice} from "@reduxjs/toolkit";

const initialState: {
	visible: boolean;
	severity: AlertColor;
	message: string;
} = {
	visible: false,
	severity: "info",
	message: "",
};
export const snackbarSlice = createSlice({
	name: "snackbarSlice",
	initialState: initialState,
	reducers: {
		showSnackBar: (state, {payload}) => {
			state.message = payload.message;
			state.severity = payload.severity ? payload.severity : "info";
			state.visible = true;
		},
		hideSnackbar: (state, {payload}) => {
			state.visible = false;
		},
	},
});

export const {showSnackBar, hideSnackbar} = snackbarSlice.actions;

export default snackbarSlice.reducer;
