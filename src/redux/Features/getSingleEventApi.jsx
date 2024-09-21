import { baseApi } from "../api/baseApi";

const getSingleEventApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getSingleEvent:builder.query({
            query:(id)=>`/events/${id}`,
            providesTags:["event"]
        })
    })
})

export const {useGetSingleEventQuery} = getSingleEventApi;