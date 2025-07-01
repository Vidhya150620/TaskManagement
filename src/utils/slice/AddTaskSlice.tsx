import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Task = {
  status: string;
  title: string;
  description: string;
  dueDate: string;
};

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasksData") || "[]"),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasksData", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1);
      localStorage.setItem("tasksData", JSON.stringify(state.tasks));
    },
       editTask: (state, action: PayloadAction<{ index: number; updatedTask: Task }>) => {
      state.tasks[action.payload.index] = action.payload.updatedTask;
      localStorage.setItem("tasksData", JSON.stringify(state.tasks));
    },
      markTaskCompleted: (state, action: PayloadAction<number>) => {
      state.tasks[action.payload].status = "Completed";
      localStorage.setItem("tasksData", JSON.stringify(state.tasks));
    },
  },
});

// export const { addTask, deleteTask, editTask , markTaskCompleted} = tasksSlice.actions;
// export default tasksSlice.reducer;

export const taskReducer = tasksSlice.reducer;
export const { addTask, deleteTask, editTask, markTaskCompleted } = tasksSlice.actions;