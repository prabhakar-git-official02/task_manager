import User from "@/models/userModel/model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import LoginActivity from "@/models/loginActivity/model";

export const Login = async (req: Request) => {
  interface message {
    success?: boolean;
    msg?: string;
  }

  try {
    const { email, password } = await req.json();

    if (!email) {
      const payload: message = {
        success: false,
        msg: "Email not found!",
      };

      return NextResponse.json(payload, {status : 400});
    }

    if (!password) {
      const payload: message = {
        success: false,
        msg: "Password not found!",
      };

      return NextResponse.json(payload,{status : 400});
    }

    const user = await User.findOne({ email });

    if (!user) {
      const payload: message = {
        success: false,
        msg: "User not Registered!",
      };

      return NextResponse.json(payload, {status : 404});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const payload: message = {
        success: false,
        msg: "Unauthorized User",
      };
      return NextResponse.json(payload, {status : 401});
    }

    interface jwtPayloadType {
      userId: string;
      userEmail: string;
    }

    const jwtPayload: jwtPayloadType = {
      userId: user._id as string,
      userEmail: user.email,
    };

    const authJWT = jwt.sign(jwtPayload, process.env.SECRET_KEY as string, {
      expiresIn: "15m",
    });

    const refreshJWT = jwt.sign(jwtPayload, process.env.SECRET_KEY as string, {
      expiresIn: "7D",
    });

    interface cookiepayloadType {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "lax" | "strict" | "none";
      path: string;
      maxAge: number;
    }

    const cookieAuthPayload: cookiepayloadType = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 15 * 60,
    };

    const cookieRefreshPayload: cookiepayloadType = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    };

    const cookieStore = await cookies();

    cookieStore.set("authjwt", authJWT, cookieAuthPayload);

    cookieStore.set("refreshjwt", refreshJWT, cookieRefreshPayload);

    const payload: message = {
      success: true,
      msg: "Login Success",
    };

    await LoginActivity.updateOne(
      { userId: user._id },
      {
        $push: { loginHistory: new Date() },
      },
      { upsert: true },
    );

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      const payload: message = {
        success: false,
        msg: err?.message,
      };
      return NextResponse.json(payload, {status : 500});
    }
  }
};
