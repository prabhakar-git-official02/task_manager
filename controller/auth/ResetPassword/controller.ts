import User from "@/models/userModel/model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const resetPassword = async (req: Request) => {
  interface message {
    success?: boolean;
    msg?: string;
  }
  try {
    const { token, password } = await req.json();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      const payload: message = {
        success: false,
        msg: "Invalid or expired token",
      };
      return NextResponse.json(payload, { status: 404 });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    user.password = hasedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const payload: message = {
      success: true,
      msg: "Password Reserted Successfully",
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
