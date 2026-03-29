import { connectdb } from "@/lib/db/lib";
import { RefreshLogin } from "@/controller/auth/RefreshLoginController/controller";

export async function POST(){
    await connectdb()
    return RefreshLogin()
}