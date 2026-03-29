import { connectdb } from "@/lib/db/lib";
import { NextRequest } from "next/server";
import { getLogoutHistory } from "@/controller/auth/getLogoutHistory/controller";

export async function GET(req:NextRequest){
    await connectdb()
    return getLogoutHistory(req)
}