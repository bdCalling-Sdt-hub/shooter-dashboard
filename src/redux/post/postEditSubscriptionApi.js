import { baseApi } from "../api/baseApi";


const postEditSubscriptionApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postEditSubscription:builder.mutation({
            query:({values,id})=>({
                url:`/subscription/update-subscription/${id}`,
                method:"PATCH",
                body:values
            }),
            invalidatesTags:["subscription"]
        })
    })
})
export const {usePostEditSubscriptionMutation} = postEditSubscriptionApi;