import { baseApi } from "../api/baseApi";

const getAllUserApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllUser:builder.query({
            query:(currentPage)=>`/user?page=${currentPage}`,
        })
    })
})

export const {useGetAllUserQuery} = getAllUserApi;