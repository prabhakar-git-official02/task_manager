import { connectdb } from "@/lib/db/lib"
import { Register } from "@/controller/auth/RegisterController/controller"
import { NextRequest } from "next/server"

export async function POST(req : NextRequest) {
    await connectdb()
    return Register(req)
}