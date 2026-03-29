import { connectdb } from "@/lib/db/lib";
import { NextRequest } from "next/server";
import { resetPassword } from "@/controller/auth/ResetPassword/controller";

export async function POST(req : NextRequest){
    await connectdb()
    return resetPassword(req)
}