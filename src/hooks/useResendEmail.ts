import {POST} from "@/api/base";
import {showSnackBar} from "@/redux/snackbarSlice";
import {useState} from "react";
import {useAppDispatch} from "../redux/store";
export const useResendEmail = () => {
	const [isResending, setResending] = useState(false);
	const dispatch = useAppDispatch();

	const resendEmail = async (isPasswordReset: Boolean, email: string) => {
		if (isResending) {
			return;
		}

		setResending(true);

		let response = await POST("auth/email/verification-notification", {
			is_password_reset: isPasswordReset,
			email: email,
		});
		setResending(false);

		dispatch(
			showSnackBar({
				message: response.msg.message ? response.msg.message : "An error occured",
				severity: response.is_error ? "error" : "success",
			})
		);
	};

	return [isResending, resendEmail] as const;
};
