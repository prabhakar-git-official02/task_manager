import { connectdb } from "@/lib/db/lib";
import { Me } from "@/controller/auth/Me/controller";
import { NextRequest } from "next/server";

export async function GET(req : NextRequest){
    await connectdb()
    return Me(req)
}