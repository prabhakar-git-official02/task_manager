import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../models/userModel/model";

export const Register = async(req : Request) => {

    interface message {
        success? : boolean,
        msg? : string
    }

    interface statusType {
        status : number
    }

    try{
    const {email,password} = await req.json()

    if(!email){
        const payload : message = {
            success : false,
            msg : "Email not found!",
        }

        const statusPayload : statusType = {
            status : 400
        }
        return NextResponse.json(payload,statusPayload)
    }

    if(!password){
        const payload : message = {
            success : false,
            msg : "Password not found!"
        }
        const statusPayload : statusType = {
            status : 400
        }
        return NextResponse.json(payload,statusPayload)
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{3,}$/

    if(!emailRegex.test(email)){
        const payload : message = {
            success : false,
            msg : "Invalid Email!"
        }
        const statusPayload : statusType = {
            status : 422
        }
        return NextResponse.json(payload,statusPayload)  
    }

    const hashedpassword = await bcrypt.hash(password,10)

    const user = await User.findOne({email})

    if(user){
        const payload : message = {
            success : false,
            msg : "User Already Registered"
        }
        const statusPayload : statusType = {
            status : 409
        }
        return NextResponse.json(payload,statusPayload)  
    }

    interface userType {
        email : string,
        password : string
    }

    const userdata : userType = {
        email : email,
        password : hashedpassword
    }

    await User.create(userdata)

    const payload : message = {
            success : true,
            msg : "Registered Successfully"
    }
        const statusPayload : statusType = {
            status : 201
    }
    return NextResponse.json(payload,statusPayload)  
}catch(err){
    if(err instanceof Error){
    const payload : message = {
            success : false,
            msg : err?.message
        }
         const statusPayload : statusType = {
            status : 500
        }
     return NextResponse.json(payload,statusPayload) 
    }
}
}
