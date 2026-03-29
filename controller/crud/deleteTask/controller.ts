import { NextResponse } from "next/server";
import Task from "@/models/crudmodel/model";
import mongoose from "mongoose";
export const deleteTask = async (req:Request,id:string) => {
  interface message {
    success?: boolean;
    msg?: string;
  }
  try {
    const userid = req.headers.get("userId")

    const user = await Task.findOne({userId : userid})

    if(!user){
     const payload: message = {
        success: false,
        msg: "User has no tasks yet",
      };

      return NextResponse.json(payload, { status: 400 });
    }
console.log("ID:", id)
console.log("UserID:", userid)

    await Task.findOneAndUpdate(
        {userId : userid},
        {$pull : {tasks : {_id : new mongoose.Types.ObjectId(id)}}},
        {new : true}
      )

     const payload: message = {
        success: true,
        msg: "Task Deleted Successfully",
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
