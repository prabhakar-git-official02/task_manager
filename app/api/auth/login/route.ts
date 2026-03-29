import { connectdb } from "@/lib/db/lib";
import { Login } from "@/controller/auth/LoginController/controller";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    await connectdb()
    return Login(req)
}