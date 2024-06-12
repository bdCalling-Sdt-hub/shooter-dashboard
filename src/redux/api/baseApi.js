import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://139.59.92.140:3232/api/v1',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    }),
    tagTypes:[],
    endpoints:()=>({
        // getUser:builder.query({
        //     query:()=>'/users'
        // })
    })
})

// export const {useGetUserQuery} = baseApi;