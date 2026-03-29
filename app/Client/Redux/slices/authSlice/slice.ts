import { createSlice } from "@reduxjs/toolkit";

interface userType {
    email : string,
    isLogin : boolean,
    refreshActivity:number
}

interface userState {
    user : userType | null,
    error : unknown | null,
    status : number | null
}

const initialState : userState = {
    user : null,
    error : null,
    status : null
}
const authSlice = createSlice({
    name : "auth" ,
    initialState,
    reducers :{
        isLoginSuccess : (state,action) => {
            state.user = action.payload;
        },
        isLoginFailure : (state,action) => {
            state.error = action.payload;
        },
        authStatus : (state,action) => {
            state.status = action.payload
        }
    }
})

export const {isLoginSuccess,isLoginFailure,authStatus} = authSlice.actions

export default authSlice.reducer