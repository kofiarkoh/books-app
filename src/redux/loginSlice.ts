import {createSlice} from "@reduxjs/toolkit";

export type User = {
	uuid: string;
	first_name: string;
	last_name: string;
	email: string;
};

const initialState: {
	isLoggedIn: boolean;
	user: User;
	bearerToken: string;
} = {
	isLoggedIn: false,
	user: {
		uuid: "",
		first_name: "",
		last_name: "",
		email: "",
	},
	bearerToken: "",
};
export const loginSlice = createSlice({
	name: "loginSlice",
	initialState: initialState,
	reducers: {
		setLoginState: (state, {payload}) => {
			state.isLoggedIn = payload;
		},
		setUserInfo: (state, {payload}) => {
			state.user = payload;
		},
		setBearerToken: (state, {payload}) => {
			state.bearerToken = payload;
		},
	},
});

export const {setLoginState, setUserInfo, setBearerToken} = loginSlice.actions;
export default loginSlice.reducer;
