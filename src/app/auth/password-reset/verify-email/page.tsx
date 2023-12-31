"use client";
import {POST} from "@/api/base";
import {showSnackBar} from "@/redux/snackbarSlice";
import {useAppDispatch} from "@/redux/store";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {FormikHelpers} from "formik";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import OTPVerification from "../../../../components/input/OTPVerification";
import {routes} from "../../../../routes";
import {useResendEmail} from "../../../../hooks/useResendEmail";

export default function Page() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [otp, setOtp] = useState("");
	const [isResending, resendEmail] = useResendEmail();
	const submitOTP = async () => {
		if (loading) {
			return;
		}

		setLoading(true);
		let email = sessionStorage.getItem("password_reset_email");
		let response = await POST("auth/forgot-password/verify-token", {
			token: otp,
			email: email,
		});
		setLoading(false);

		dispatch(
			showSnackBar({
				message: response.msg.message ? response.msg.message : "An error occured",
				severity: response.is_error ? "error" : "success",
			})
		);
		if (!response.is_error) {
			sessionStorage.setItem("password_reset_token", otp);
			router.push(routes.resetPassword);
		}
	};

	const handleResend = () => {
		resendEmail(true, sessionStorage.getItem("password_reset_email"));
	};
	useEffect(() => {
		let email = sessionStorage.getItem("password_reset_email");

		if (email === null) {
			dispatch(
				showSnackBar({
					message: "No reset credentials found",
					severity: "error",
				})
			);
			router.push(routes.login);
		}
	}, []);

	useEffect(() => {
		document.title = "Verify Email";
	}, []);

	return (
		<div
			style={{
				backgroundColor: "rgb(243, 245, 249)",
				height: "97vh",
				width: "100%",
				padding: "0px",
				margin: "0px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Card sx={{padding: 5, margin: {xs: 4}}}>
				<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
					Verify Your Email
				</Typography>
				<Typography variant="body2" sx={{textAlign: "center"}}>
					Enter the OTP which has been sent to your email
				</Typography>

				<OTPVerification
					otp={otp}
					handleOTPChange={setOtp}
					isLoading={loading}
					isResending={isResending}
					onSubmit={submitOTP}
					handleResend={handleResend}
				/>
			</Card>
		</div>
	);
}
