import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import userReducer from './userSlice';
import { todoApiSlice } from './todoApiSlice';
// import todoReducer from './TodoSlice';
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
        [todoApiSlice.reducerPath]: todoApiSlice.reducer,
        // todo: todoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(todoApiSlice.middleware),
});

export default store;