import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../conf';


const USERS_URL = BACKEND_URL + 'api/users'

const baseQuery = fetchBaseQuery({ baseUrl: '' })

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
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/requestPasswordReset`,
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/resetPassword`,
                method: 'POST',
                body: data,
            }),
        }),

    })
})

export const { useLoginMutation, useLogoutMutation, useSignupMutation, useUpdateUserMutation,
    useForgotPasswordMutation,
    useGetHelloQuery,
    useResetPasswordMutation
} = apiSlice