import { connectdb } from "@/lib/db/lib";
import { NextRequest } from "next/server";
import { addTask } from "@/controller/crud/addTask/controller";

export async function PATCH(req : NextRequest){
    await connectdb()
    return addTask(req)
}