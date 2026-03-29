import { NextResponse } from "next/server";
import Task from "@/models/crudmodel/model";
export const getTasks = async (req: Request) => {

  interface message {
    success?: boolean;
    msg?: string;
    data? : unknown[];
  }
  
  try {
    const userid = req.headers.get("userId")

    const tasks = await Task.findOne({userId : userid})

    if(!tasks){
      const payload: message = {
        success: false,
        msg: "User has no tasks yet",
      };
      return NextResponse.json(payload, { status: 404});
    }

    const payload: message = {
        success: true,
        msg: "Tasks Fetched Successfully",
        data : tasks.tasks
      };

    return NextResponse.json(payload, { status: 200 });

  } catch (err) {
    if (err instanceof Error) {
      const payload: message = {
        success: false,
        msg: err?.message,
      };

      return NextResponse.json(payload, { status: 400 });
    }
  }
};
