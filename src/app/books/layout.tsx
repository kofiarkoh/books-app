"use client";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import {useRouter} from "next/navigation";
import {routes} from "../../routes";

export default function Layout({children}: {children: React.ReactNode}) {
	const [isDialogVisible, setDialogVisible] = useState(false);
	const router = useRouter();

	const logOut = () => {
		sessionStorage.clear();
		router.push(routes.login);
	};

	const closeDialog = () => {
		setDialogVisible(false);
	};

	const openDialog = () => {
		setDialogVisible(true);
	};
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
						aria-label="log out"
						onClick={openDialog}
						sx={{mr: 2}}>
						<LogoutIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<div style={{paddingTop: "40px"}}>{children}</div>
			<ConfirmDialog
				onAccept={logOut}
				onCancel={closeDialog}
				title={"Do you want log out?"}
				message={"You will need to login again to view your books"}
				visible={isDialogVisible}
				isloading={false}
			/>
		</div>
	);
}
