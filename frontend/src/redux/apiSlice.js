import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';


const USERS_URL = '/api/users'

const baseQuery = fetchBaseQuery({ baseUrl: '/api' })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getHello: builder.query({
            query: () => '/',
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
    })
})

export const { useLoginMutation, useLogoutMutation, useSignupMutation, useUpdateUserMutation,
    useGetHelloQuery
} = apiSlice