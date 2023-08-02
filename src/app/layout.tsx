"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import "./globals.css";
import {Provider} from "react-redux";
import {reduxStore} from "../redux/store";
import AppSnackbar from "../components/forms/AppSnackbar";

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<Provider store={reduxStore}>
				<ThemeProvider theme={createTheme()}>
					<body>
						{children}
						<AppSnackbar />
					</body>
				</ThemeProvider>
			</Provider>
		</html>
	);
}
