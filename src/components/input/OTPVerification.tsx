import {MuiOtpInput} from "mui-one-time-password-input";
import AppButton from "./AppButton";

export default function OTPVerification({
	otp,
	handleOTPChange,
	isLoading,
	onSubmit,
	handleResend,
	isResending,
}: {
	otp: string;
	handleOTPChange: (otp: string) => void;
	isLoading: boolean;
	isResending: boolean;
	onSubmit: () => void;
	handleResend: () => void;
}) {
	return (
		<>
			<div style={{padding: "20px", width: "100%"}}>
				<MuiOtpInput
					value={otp}
					length={4}
					onChange={handleOTPChange}
					width={400}
				/>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: "20px",
					}}>
					<AppButton
						loading={isResending}
						onClick={handleResend}
						variant="outlined"
						sx={{marginRight: 2}}>
						Resend Code
					</AppButton>
					<AppButton
						variant="contained"
						loading={isLoading}
						onClick={onSubmit}
						sx={{marginLeft: 2}}>
						Submit
					</AppButton>
				</div>
			</div>
		</>
	);
}
