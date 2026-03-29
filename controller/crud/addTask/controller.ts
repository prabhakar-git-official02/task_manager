import { NextResponse } from "next/server";
import User from "@/models/userModel/model";
import Task from "@/models/crudmodel/model";

export const addTask = async (req: Request) => {

    interface message {
    success?: boolean;
    msg?: string;
  }
  try {
    const { title, description, notes, completed } = await req.json();

    const userid = req.headers.get("userId") as string;

    const user = await User.findById(userid);

    if (!user) {
      const payload: message = {
        success: false,
        msg: "User not Registered!",
      };

      return NextResponse.json(payload, {status : 400});
    }

    if (!title) {
      const payload: message = {
        success: false,
        msg: "Title is Required",
      };

      return NextResponse.json(payload, {status : 400});
    }


    await Task.findOneAndUpdate(
      { userId: userid },
      {
        $push: {
          tasks: {
            title,
            description,
            notes,
            completed: completed ?? false
          }
        }
      },
      {
        upsert: true,   
        new: true
      }
    );

      const payload: message = {
        success: false,
        msg: "Task Saved",
      };

      return NextResponse.json(payload, {status : 200});

  } catch (err) {
    if (err instanceof Error) {
      const payload: message = {
        success: false,
        msg: err?.message,
      };

      return NextResponse.json(payload, {status : 400});
    }
  }
};