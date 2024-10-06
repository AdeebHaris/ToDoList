import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [], // For storing todos
        completedItems: [],
        selectedDate: null, // For storing selected date
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        completeTodo: (state, action) => {
            const todoToComplete = state.items.find(item => item.id === action.payload);
            if (todoToComplete) {
                state.completedItems.push({ ...todoToComplete });
                state.items = state.items.filter(item => item.id !== action.payload);
            }
        }
    },
});

export default todoSlice.reducer;
export const { addTodo, removeItem, setSelectedDate,completeTodo } = todoSlice.actions;

