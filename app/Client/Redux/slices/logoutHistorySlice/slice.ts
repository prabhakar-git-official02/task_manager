import { createSlice } from "@reduxjs/toolkit";

interface logoutHistoryState {
    logoutHistory : unknown[],
    error : unknown
}

const initialState : logoutHistoryState = {
    logoutHistory : [],
    error : null
}

const logoutHistorySlice = createSlice({
    name : "LogoutHistory",
    initialState,
    reducers : {
        isLogoutHistorySuccess : (state,action) => {
            state.logoutHistory = action.payload
        },
        isLogoutHistoryFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {isLogoutHistorySuccess,isLogoutHistoryFailure} = logoutHistorySlice.actions

export default logoutHistorySlice.reducer