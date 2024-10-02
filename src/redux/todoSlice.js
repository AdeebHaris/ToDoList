import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: [],
    reducers: {
        addtoTodoList: (state, action) => {
            state.push(action.payload); 
        },
        removeItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload); 
        }
    }
});

export default todoSlice.reducer;
export const { addtoTodoList, removeItem } = todoSlice.actions;
