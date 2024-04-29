import { baseApi } from "../api/baseApi";

const getAllUserApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllUser:builder.query({
            query:()=>`/user`
        })
    })
})

export const {useGetAllUserQuery} = getAllUserApi;