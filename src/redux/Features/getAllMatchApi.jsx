import { baseApi } from "../api/baseApi";

const getAllMatchApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllMatch:builder.query({
            query:({id})=>`/events/match-list/${id}`,
        })
    })
})

export const {useGetAllMatchQuery} = getAllMatchApi;