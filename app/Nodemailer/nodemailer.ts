import nodemailer from "nodemailer"
import { NextResponse } from "next/server"
export const sendMail = async(to : string,subject : string,html:string) => {
    try{
        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }
        })

        await transporter.sendMail({
            from : `Support <${process.env.EMAIL_USER}`,
            to,
            subject,
            html
        })
    }catch(err){
        if(err instanceof Error){
            return NextResponse.json({msg : err?.message},{status : 500})
        }
    }
}