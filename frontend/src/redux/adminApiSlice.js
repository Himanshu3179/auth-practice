import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const ADMIN_URL = '/api/admin'

const baseQuery = fetchBaseQuery({ baseUrl: '/api' })

export const adminApiSlice = createApi({
    baseQuery,
    tagTypes: ['Admin'],
    reducerPath: 'adminApiSlice',
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `${ADMIN_URL}/users`,
            providesTags: ['Admin'],
        }),
    }),
});
export const { useGetAllUsersQuery } = adminApiSlice;