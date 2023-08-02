"use client";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {ThemeProvider, createTheme} from "@mui/material/styles";

import type {Metadata} from "next";
import {Inter} from "next/font/google";

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<ThemeProvider theme={createTheme()}>
				<body>{children}</body>
			</ThemeProvider>
		</html>
	);
}
