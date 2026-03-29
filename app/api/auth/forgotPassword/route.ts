import { connectdb } from "@/lib/db/lib";
import { NextRequest } from "next/server";
import { forgotPassword } from "@/controller/auth/ForgotPassword/controller";

export async function POST(req : NextRequest){
    await connectdb()
    return forgotPassword(req)
}

