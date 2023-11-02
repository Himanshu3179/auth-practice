import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const TODOS_URL = '/api/todos'

const baseQuery = fetchBaseQuery({ baseUrl: '/api' })

export const todoApiSlice = createApi({
    baseQuery,
    tagTypes: ['Todo'],
    reducerPath: 'todoApiSlice',
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => `${TODOS_URL}/`,
            providesTags: ['Todo'], // Tags provided by this query
        }),
        getTodoById: builder.query({
            query: (id) => `${TODOS_URL}/${id}`,
            providesTags: ['Todo'], // Tags provided by this query
        }),
        createTodo: builder.mutation({
            query: (body) => ({
                url: `${TODOS_URL}/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Todo'],
        }),
        updateTodo: builder.mutation({
            query: ({ id, title, completed }) => ({
                url: `${TODOS_URL}/${id}`,
                method: 'PUT',
                body: { title, completed },
            }),
            invalidatesTags: ['Todo'],
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `${TODOS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo'],
        }),

    }),
});
export const { useGetTodosQuery,
    useGetTodoByIdQuery,
    useUpdateTodoMutation,
    useCreateTodoMutation,
    useDeleteTodoMutation
} = todoApiSlice;