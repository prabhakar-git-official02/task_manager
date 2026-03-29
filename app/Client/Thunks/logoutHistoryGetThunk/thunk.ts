import type { AppDispatch } from "../../Redux/store/reduxStore/store";
import { isLogoutHistorySuccess,isLogoutHistoryFailure } from "../../Redux/slices/logoutHistorySlice/slice";
import axios from "axios";
import api from "@/app/api/axios/api";


export const getLogoutHistoryThunk = () => {
    return async(dispatch : AppDispatch) => {
        try{
            const response = await api.get("/api/auth/logoutHistory",
                {withCredentials : true}
            )
            if(response){
                dispatch(isLogoutHistorySuccess(response?.data?.data))
            }
        }catch(err){
            if(axios.isAxiosError(err)){
                dispatch(isLogoutHistoryFailure(err?.response?.data?.msg))
                console.log("getLogoutHistoryThunk-Error",err?.response?.data?.msg);
            } else {
                if(err instanceof Error){
                    dispatch(isLogoutHistoryFailure(err?.message))
                    console.log("getLogoutHistoryThunk-Error",err?.message); 
                }
            }
        }
    }
}