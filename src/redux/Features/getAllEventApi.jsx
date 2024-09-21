import { baseApi } from "../api/baseApi";

const getAllEventApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllEvent:builder.query({
            query:(currentPage)=>`/events/all?limit=8&page=${currentPage}`,
            providesTags:["event"]
        })
    })
})

export const {useGetAllEventQuery} = getAllEventApi;