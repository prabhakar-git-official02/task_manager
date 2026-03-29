import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import LogoutActivity from "@/models/logoutActivity/model";

export const Logout = async (req: Request) => {
  interface message {
    success?: boolean;
    msg?: string;
    isLogout?: boolean;
    logoutActivity?: number;
  }

  try {
    const userid = req.headers.get("userId") as string;

    if (!userid) {
      const payload: message = {
        success: false,
        msg: "User not Logged",
      };
      return NextResponse.json(payload, { status: 404 });
    }

    const cookieStore = await cookies();

    cookieStore.delete("authjwt");

    cookieStore.delete("refreshjwt");

    const respayload: message = {
      success: true,
      msg: "Logout Successfully",
      isLogout: true,
      logoutActivity: Date.now(),
    };

    await LogoutActivity.updateOne(
      { userId: userid },
      {
        $push: { logoutHistory: new Date() },
      },
      { upsert: true },
    );

    return NextResponse.json(respayload, { status: 200 });
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
