import { connectdb } from "@/lib/db/lib";
import { NextRequest } from "next/server";
import { deleteTask } from "@/controller/crud/deleteTask/controller";

export async function DELETE(req: NextRequest,context: { params: Promise<{ id: string }> }
) {
  await connectdb()

  const { id } = await context.params 

  return deleteTask(req, id)
}