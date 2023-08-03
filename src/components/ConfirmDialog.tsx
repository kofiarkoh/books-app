import {LoadingButton} from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {TransitionProps} from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface props {
	onAccept: () => void;
	onCancel: () => void;
	title: string;
	message: string;
	visible: boolean;
	isloading: boolean;
}
export default function ConfirmDialog({
	onAccept,
	onCancel,
	visible,
	title,
	message,
	isloading = false,
}: props) {
	return (
		<Dialog
			open={visible}
			TransitionComponent={Transition}
			keepMounted
			onClose={onCancel}
			aria-describedby="alert-dialog-slide-description">
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText
					sx={{textAlign: "center"}}
					dangerouslySetInnerHTML={{
						__html: message,
					}}
					id="alert-dialog-slide-description"></DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} disabled={isloading}>
					Cancel
				</Button>
				<LoadingButton onClick={onAccept} loading={isloading}>
					OK
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
