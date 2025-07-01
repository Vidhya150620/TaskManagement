    import { configureStore } from "@reduxjs/toolkit";
    // import  addTask  from "../utils/slice/AddTaskSlice";
import {  quoteReducer, taskReducer } from "../utils/slice";
    // import 

    export const store = configureStore({
        reducer:{
            tasks : taskReducer,
            quote: quoteReducer,
        }
    })

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;