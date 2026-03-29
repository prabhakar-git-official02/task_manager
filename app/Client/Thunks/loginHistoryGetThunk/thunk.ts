import type { AppDispatch } from "../../Redux/store/reduxStore/store";
import { isLoginHistorySuccess,isLoginHistoryFailure } from "../../Redux/slices/loginHistorySlice/slice";
import axios from "axios";
import api from "@/app/api/axios/api";


export const getLoginHistoryThunk = () => {
    return async(dispatch : AppDispatch) => {
        try{
            const response = await api.get("/api/auth/loginHistory",
                {withCredentials : true}
            )
            if(response){
                dispatch(isLoginHistorySuccess(response?.data?.data))
            }
        }catch(err){
            if(axios.isAxiosError(err)){
                dispatch(isLoginHistoryFailure(err?.response?.data?.msg))
                console.log("getLoginHistoryThunk-Error",err?.response?.data?.msg);
            } else {
                if(err instanceof Error){
                    dispatch(isLoginHistoryFailure(err?.message))
                    console.log("getLoginHistoryThunk-Error",err?.message); 
                }
            }
        }
    }
}