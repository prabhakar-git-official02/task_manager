import crypto from "crypto";
import User from "@/models/userModel/model";
import { sendMail } from "@/app/Nodemailer/nodemailer";
import { NextResponse } from "next/server";

export const forgotPassword = async (req: Request) => {
  interface message {
    success?: boolean;
    msg?: string;
  }
  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      const payload: message = {
        success: false,
        msg: "User not found",
      };
      return NextResponse.json(payload, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpire = new Date(Date.now() + 1000 * 60 * 15);
    await user.save();

    const resetLink = `${ process.env.NODE_ENV === "development"
    ? process.env.NEXT_LOCAL_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL}/Client/Auth/ResetPassword/${token}`;

    await sendMail(
      email,
      "Reset Password",
      `<p>Click here to reset: <a href="${resetLink}">Reset</a></p>`,
    );

    const payload: message = {
      success: true,
      msg: "Reset Password Send to your Email",
    };
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      const payload: message = {
        success: false,
        msg: err?.message,
      };
      return NextResponse.json(payload, { status: 500 });
    }
  }
};
