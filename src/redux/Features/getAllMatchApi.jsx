import { baseApi } from "../api/baseApi";

const getAllMatchApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllMatch:builder.query({
            query:(currentPage)=>`/match/all?limit=8&page=${currentPage}`,
        })
    })
})

export const {useGetAllMatchQuery} = getAllMatchApi;