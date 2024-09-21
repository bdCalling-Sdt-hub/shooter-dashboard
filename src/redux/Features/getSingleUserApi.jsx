import { baseApi } from "../api/baseApi";

const getSingleUserApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getSingleUser:builder.query({
            query:(id)=>`/user/${id}`,
            providesTags:["user"]

        })
    })
})

export const {useGetSingleUserQuery} = getSingleUserApi;