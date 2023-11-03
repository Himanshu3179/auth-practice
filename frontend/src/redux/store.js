import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import userReducer from './userSlice';
import { todoApiSlice } from './todoApiSlice';
import { adminApiSlice } from './adminApiSlice';
// import todoReducer from './TodoSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
        [todoApiSlice.reducerPath]: todoApiSlice.reducer,
        // todo: todoReducer,
        [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(todoApiSlice.middleware)
            .concat(adminApiSlice.middleware),
});

export default store;