import { baseApi } from "../api/baseApi";

const getSingleEventApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getSingleEvent:builder.query({
            query:(id)=>`/events/${id}`,
        })
    })
})

export const {useGetSingleEventQuery} = getSingleEventApi;