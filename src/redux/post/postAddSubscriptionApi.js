import { baseApi } from "../api/baseApi";


const postAddSubscriptionApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postAddSubscription:builder.mutation({
            query:({values})=>({
                url:`/subscription/add-subscription`,
                method:"POST",
                body:values
            }),
            invalidatesTags:["subscription"]
        })
    })
})
export const {usePostAddSubscriptionMutation} = postAddSubscriptionApi;