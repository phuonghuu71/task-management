import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task";

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default store;