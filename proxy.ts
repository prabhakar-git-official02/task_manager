import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req : NextRequest){
    try{
        const token = req.cookies.get("authjwt")?.value

        interface responseType {
            success : boolean,
            msg : string
        }

        if(!token){
        const response : responseType = {
            success : false,
            msg : "User not Logged"
            }
            return NextResponse.json(response,{status : 401})
        }

      const verifyToken =  jwt.verify(
        token,
        process.env.SECRET_KEY as string
    ) as {userId : string,userEmail : string}

    const requestHeaders = new Headers(req.headers)

    requestHeaders.set("userId",verifyToken.userId)
    requestHeaders.set("userEmail",verifyToken.userEmail)

    return NextResponse.next({
        request : {
            headers : requestHeaders
        }
    })
    
    }catch(err){
        if(err instanceof Error){
            return new NextResponse(null,{status : 500})
        }
    }
}

export const config = {
        matcher : [
            "/api/auth/logout",
            "/api/crud/addTask",
            "/api/auth/me",
            "/api/crud/getTask",
            "/api/crud/deleteTask/:path*",
            "/api/crud/editTask/:path*",
            "/api/auth/loginHistory",
            "/api/auth/logoutHistory"
        ]
      }