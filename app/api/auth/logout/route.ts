import { connectdb } from "@/lib/db/lib";
import { Logout } from "@/controller/auth/Logout/controller";
import { NextRequest } from "next/server";

export async function DELETE(req : NextRequest){
    await connectdb()
    return Logout(req)
}
