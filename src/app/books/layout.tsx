import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<div>
			<AppBar position="fixed" sx={{position: "fixed"}}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						BooksApp
					</Typography>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{mr: 2}}>
						<LogoutIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<div style={{paddingTop: "40px"}}>{children}</div>
		</div>
	);
}
