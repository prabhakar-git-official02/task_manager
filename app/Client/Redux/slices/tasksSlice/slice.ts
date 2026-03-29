import { createSlice } from "@reduxjs/toolkit";

interface TaskType {
  completed?: boolean
  createdAt?: string
  description?: string
  notes?: string
  title?: string
  _id?: string
}

interface TasksState {
  tasks: TaskType[] 
  error : unknown
}

const initialState: TasksState = {
  tasks: [],
  error : null,
}

const tasksSlice = createSlice({
    name : "Tasks",
    initialState,
    reducers : {
        isTasksSuccess : (state,action) => {
            state.tasks = action.payload
        },
        isTasksFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {isTasksSuccess,isTasksFailure} = tasksSlice.actions

export default tasksSlice.reducer