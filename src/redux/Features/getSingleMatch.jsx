import { baseApi } from "../api/baseApi";

const getSingleMatch = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getSingleMatch:builder.query({
            query:(id)=>`/match/get-single-match/${id}`,
        })
    })
})

export const {useGetSingleMatchQuery} = getSingleMatch;