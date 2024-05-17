import { baseApi } from "../api/baseApi";

const getAllSubscriptionApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllSubscription:builder.query({
            query:()=>`/subscription/get-subscription`
        })
    })
})

export const {useGetAllSubscriptionQuery} = getAllSubscriptionApi;