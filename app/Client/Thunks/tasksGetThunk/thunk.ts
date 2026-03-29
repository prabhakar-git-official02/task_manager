import type { AppDispatch } from "../../Redux/store/reduxStore/store";
import { isTasksSuccess,isTasksFailure } from "../../Redux/slices/tasksSlice/slice";
import axios from "axios";
import api from "@/app/api/axios/api";


export const getTasksThunk = () => {
    return async(dispatch : AppDispatch) => {
        try{
            const response = await api.get("/api/crud/getTask",
                {withCredentials : true}
            )
            if(response){
                dispatch(isTasksSuccess(response?.data?.data))
            }
        }catch(err){
            if(axios.isAxiosError(err)){
                dispatch(isTasksFailure(err?.response?.data?.msg))
                console.log("getTasks-Error",err?.response?.data?.msg);
            } else {
                if(err instanceof Error){
                    dispatch(isTasksFailure(err?.message))
                    console.log("getTasks-Error",err?.message); 
                }
            }
        }
    }
}