import { NextResponse } from "next/server";
import LoginActivity from "@/models/loginActivity/model";

export const getLoginHistory = async (req: Request) => {
  interface message {
    success?: boolean;
    msg?: string;
    data?: unknown[];
  }

  try {
    const userid = req.headers.get("userId");

    const loginHistory = await LoginActivity.findOne({ userId: userid });

    if (!loginHistory) {
      const payload: message = {
        success: false,
        msg: "User has no login history yet",
      };
      return NextResponse.json(payload, { status: 404 });
    }

    const payload: message = {
      success: true,
      msg: "Login History Fetched Successfully",
      data: loginHistory.loginHistory,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      const payload: message = {
        success: false,
        msg: err?.message,
      };

      return NextResponse.json(payload, { status: 400 });
    }
  }
};
