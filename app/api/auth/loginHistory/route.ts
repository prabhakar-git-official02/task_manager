import { NextRequest } from "next/server";
import { getLoginHistory } from "@/controller/auth/getLoginHistory/controller";
import { connectdb } from "@/lib/db/lib";

export async function GET(req : NextRequest){
    await connectdb()
    return getLoginHistory(req)
}