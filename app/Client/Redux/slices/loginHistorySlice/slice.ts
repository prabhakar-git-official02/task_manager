import { createSlice } from "@reduxjs/toolkit";

interface loginHistoryState {
    loginHistory : unknown[],
    error : unknown
}

const initialState : loginHistoryState = {
    loginHistory : [],
    error : null
}

const loginHistorySlice = createSlice({
    name : "LoginHistory",
    initialState,
    reducers : {
        isLoginHistorySuccess : (state,action) => {
            state.loginHistory = action.payload
        },
        isLoginHistoryFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {isLoginHistorySuccess,isLoginHistoryFailure} = loginHistorySlice.actions

export default loginHistorySlice.reducer