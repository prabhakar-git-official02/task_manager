import { connectdb } from "@/lib/db/lib";
import { NextRequest } from "next/server";
import { getTasks } from "@/controller/crud/getTasks/controller";

export async function GET(req : NextRequest){
    await connectdb()
    return getTasks(req)
}