import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        removeAllTodos(state) {
            state.todos = [];
        }
    }
})

export const { removeAllTodos } = todoSlice.actions;

export default todoSlice.reducer;
