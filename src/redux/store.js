import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice"; // Adjust if the path is different

const store = configureStore({
    reducer: {
        todos: todoSlice, // Make sure this matches the name used in your slice
    },
});

export default store;

