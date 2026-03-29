import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../../slices/authSlice/slice';
import tasksReducer from '../../slices/tasksSlice/slice';
import loginHistoryReducer from '../../slices/loginHistorySlice/slice';
import logoutHistoryReducer from '../../slices/logoutHistorySlice/slice';

export const store = configureStore({
    reducer : {
        auth : authReducer,
        Tasks : tasksReducer,
        LoginHistory : loginHistoryReducer,
        LogoutHistory : logoutHistoryReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch