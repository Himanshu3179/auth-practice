import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../conf';
const ADMIN_URL = BACKEND_URL + 'api/admin'

const baseQuery = fetchBaseQuery({ baseUrl: '' })

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