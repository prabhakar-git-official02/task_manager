import { NextResponse } from "next/server";
import Task from "@/models/crudmodel/model";
import mongoose from "mongoose";
export const editTask = async (req: Request, id: string) => {
  interface message {
    success?: boolean;
    msg?: string;
  }
  try {
    const userid = req.headers.get("userId")

    const user = await Task.findOne({userId : userid})

    const UpdatedData = await req.json()

    if(!UpdatedData){
       const payload: message = {
        success: false,
        msg: "Datas not found",
      };
      return NextResponse.json(payload, { status: 404 });
    }

    if(!user){
    const payload: message = {
        success: false,
        msg: "User has no tasks yet",
      };
      return NextResponse.json(payload, { status: 404 });
    }

      const updatefields:Record<string,unknown> = {};

      Object.keys(UpdatedData).forEach((key) => {
          updatefields[`tasks.$.${key}`] = UpdatedData[key]
      });

      await Task.updateOne(
        {userId : userid,"tasks._id" : new mongoose.Types.ObjectId(id)},
        {$set : updatefields}
      )

    const payload: message = {
        success: true,
        msg: "Task Updated",
      };
      return NextResponse.json(payload, { status: 200 });
      
  } catch (err) {
    if (err instanceof Error) {
      const payload: message = {
        success: false,
        msg: err?.message,
      };

      return NextResponse.json(payload, { status: 500 });
    }
  }
};
