import axios from "axios";
import {reduxStore} from "../redux/store";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const errorHandler = (error: any) => {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx

		return {
			is_error: true,
			msg: error.response.data,
			code: error.response.status,
		};
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		//

		console.log(",,,,", error);
		return {
			is_error: true,
			msg: error.request._timedOut
				? "Connection timed out, Please check your internet connection"
				: "There was an error connecting to server.", // error.request
			code: 500,
		};
	} else {
		// Something happened in setting up the request that triggered an Error
		return {
			is_error: true,
			msg: error.message,
			code: 500,
		};
	}
};

export const POST = async (
	endpoint: string,
	data: any,
	headers: any = {},
	timeout = 1800000
) => {
	let token = reduxStore.getState().loginState.bearerToken;
	let _headers = {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	_headers = {..._headers, ...headers};

	return await axios
		.post(`${BASE_URL}/${endpoint}`, data, {
			headers: _headers,
			timeout: timeout,
			timeoutErrorMessage: "Connection Timed out",
		})
		.then((res) => {
			return {
				is_error: false,
				msg: res.data,
				code: 200,
			};
		})
		.catch((error) => {
			return errorHandler(error);
		});
};

export const GET = async (endpoint: string, headers = {}) => {
	let token = reduxStore.getState().loginState.bearerToken;

	let _headers = {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	};
	_headers = {..._headers, ...headers};
	return await axios
		.get(`${BASE_URL}/${endpoint}`, {
			headers: _headers,
			timeoutErrorMessage: "Connection Timed out",
		})
		.then(async (res) => {
			return {
				is_error: false,
				msg: res.data,
				code: 200,
			};
		})
		.catch((error) => {
			return errorHandler(error);
		});
};

export const DELETE = async (endpoint: string, headers = {}) => {
	let token = reduxStore.getState().loginState.bearerToken;

	let _headers = {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	};
	let url = `${BASE_URL}/${endpoint}`;
	return await axios
		.delete(url, {
			headers: _headers,

			timeoutErrorMessage: "Connection Timed out",
		})
		.then((res) => {
			return {
				is_error: false,
				msg: res.data,
				code: 200,
			};
		})
		.catch((error) => {
			return errorHandler(error);
		});
};
