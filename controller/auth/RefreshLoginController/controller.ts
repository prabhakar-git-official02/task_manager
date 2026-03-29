import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const RefreshLogin = async () => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("refreshjwt")?.value;

    if (!token) {
      return new NextResponse(null, { status: 401 });
    }

   const verifyToken = jwt.verify(
    token,
    process.env.SECRET_KEY as string
) as { userId: string; userEmail: string };

    if (!verifyToken) {
       return new NextResponse(null, { status: 401 }); 
    }

    interface jwtPayloadType {
      userId: string;
      userEmail: string;
    }

    const jwtPayload: jwtPayloadType = {
      userId: verifyToken.userId,
      userEmail: verifyToken.userEmail,
    };

    const authJWT = jwt.sign(jwtPayload, process.env.SECRET_KEY as string, {
      expiresIn: "15m",
    });

    interface cookiepayloadType {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "lax" | "strict" | "none";
      path : string,
      maxAge: number;
    }

    const cookieAuthPayload: cookiepayloadType = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
       path : "/",
      maxAge: 15 * 60,
    };

    cookieStore.set("authjwt", authJWT, cookieAuthPayload);

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
 return new NextResponse(null, { status: 500 }); 
    }
  }
};
