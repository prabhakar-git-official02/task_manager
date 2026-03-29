import { NextRequest } from "next/server";
import { connectdb } from "@/lib/db/lib";
import { editTask } from "@/controller/crud/editTask/controller";

export async function PATCH(req : NextRequest,context : {params : Promise<{id : string}>}){
    await connectdb()
    const {id} = await context.params
    return editTask(req,id)
}