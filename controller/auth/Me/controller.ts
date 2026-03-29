import User from "@/models/userModel/model";
import { NextResponse } from "next/server";

export const Me = async (req: Request) => {
  interface message {
    success?: boolean;
    msg?: string;
  }
  try {
    const userid = req.headers.get("userId");

    const user = await User.findById(userid).select("-password");

    if (!user) {
      const payload: message = {
        success: false,
        msg: "User not found",
      };

      return NextResponse.json(payload, { status: 404 });
    }

    interface userpayloadType {
      isLogin: boolean;
      email: string;
      refreshActivity: number;
    }

    const payload: userpayloadType = {
      isLogin: true,
      email: user.email,
      refreshActivity: Date.now(),
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
