import { NextResponse } from "next/server";
import LogoutActivity from "@/models/logoutActivity/model";

export const getLogoutHistory = async (req: Request) => {
  interface message {
    success?: boolean;
    msg?: string;
    data?: unknown[];
  }

  try {
    const userid = req.headers.get("userId");

    const logoutHistory = await LogoutActivity.findOne({ userId: userid });

    if (!logoutHistory) {
      const payload: message = {
        success: false,
        msg: "User has no logout history yet",
      };
      return NextResponse.json(payload, { status: 404 });
    }

    const payload: message = {
      success: true,
      msg: "Logout History Fetched Successfully",
      data: logoutHistory.logoutHistory,
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