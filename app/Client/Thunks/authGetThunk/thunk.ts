import api from "@/app/api/axios/api"
import axios from "axios"
import { isLoginSuccess,isLoginFailure,authStatus } from "../../Redux/slices/authSlice/slice"
import type { AppDispatch } from "../../Redux/store/reduxStore/store"

export const authGetThunk = () => {
    return async(dispatch : AppDispatch) => {
        try{
            const response = await api.get("/api/auth/me",
                {withCredentials : true}
            )
            if(response){
                dispatch(isLoginSuccess(response?.data))
                dispatch(authStatus(response.status || 200))
            }
        }catch(err){
            const statusCode : number = 500
            if(axios.isAxiosError(err)){
                console.log("authGetThunk-Error",err?.response?.data?.msg)
                dispatch(isLoginFailure(err?.response?.data?.msg))
                dispatch(authStatus(err?.response?.status || statusCode))
            } else {
                if(err instanceof Error){
                    console.log("authGetThunk-Error",err?.message)
                     dispatch(isLoginFailure(err?.message))
                     dispatch(authStatus(statusCode))
                }
            }
        }
    }
}