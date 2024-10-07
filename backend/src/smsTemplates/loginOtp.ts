interface LOGIN {
   otp: string;
   otpMessage: string;
}

export function loginOtp(): LOGIN {
   const otp = Math.floor(1000 + Math.random() * 9000).toString();
   const otpMessage = `Your One Time OTP is ${otp}`;
   return { otp, otpMessage };
}
