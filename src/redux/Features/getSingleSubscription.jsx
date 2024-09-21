import { baseApi } from "../api/baseApi";

const getSingleSubscription = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getSingleSubscription:builder.query({
            query:(id)=>`/subscription/get-subscription/${id}`,
            providesTags:["subscription"]
        })
    })
})

export const {useGetSingleSubscriptionQuery} = getSingleSubscription;