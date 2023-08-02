"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import "./globals.css";
import {Provider} from "react-redux";
import {reduxStore, useAppDispatch} from "../redux/store";
import AppSnackbar from "../components/forms/AppSnackbar";
import {setBearerToken, setLoginState, setUserInfo} from "../redux/loginSlice";
import {useRouter} from "next/navigation";
import {ReactElement, useState, useEffect} from "react";

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<Provider store={reduxStore}>
				<ThemeProvider theme={createTheme()}>
					<body>
						<UserInfoLoader>
							<>
								{children}
								<AppSnackbar />
							</>
						</UserInfoLoader>
					</body>
				</ThemeProvider>
			</Provider>
		</html>
	);
}

const UserInfoLoader = (props: ReactElement) => {
	const [isloading, setLoading] = useState(true);
	const router = useRouter();
	const dispatch = useAppDispatch();
	useEffect(() => {
		setLoading(true);
		let _userInfo: string | null = sessionStorage.getItem("user_info");
		let token: string | null = sessionStorage.getItem("bearer_token");

		if (!_userInfo || !token) {
			setLoading(false);
			dispatch(setLoginState(false));

			router.push("/auth/login");
		} else {
			let userInfo = JSON.parse(_userInfo);
			dispatch(setBearerToken(token));
			dispatch(setUserInfo(userInfo));
			dispatch(setLoginState(true));

			setLoading(false);
		}
	}, []);

	if (isloading) {
		return <></>;
	}
	return <>{props.children}</>;
};
