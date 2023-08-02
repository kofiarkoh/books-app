import React from "react";

import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Snackbar, {SnackbarOrigin} from "@mui/material/Snackbar";
import {hideSnackbar} from "../../redux/snackbarSlice";
import {useAppSelector, useAppDispatch} from "../../redux/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const position: SnackbarOrigin = {vertical: "top", horizontal: "right"};
export default function AppSnackbar() {
	const {visible, message, severity} = useAppSelector(
		(state) => state.snackbarState
	);
	const dispatch = useAppDispatch();

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		dispatch(hideSnackbar({}));
	};
	return (
		<Snackbar
			open={visible}
			anchorOrigin={position}
			autoHideDuration={3000}
			onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity} sx={{width: "100%"}}>
				{message}
			</Alert>
		</Snackbar>
	);
}
