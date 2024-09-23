import { baseApi } from "../api/baseApi";


const postPrivacyPolicyApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postPricyPolicyApi:builder.mutation({
            query:({content})=>(
                {
                url:`/setting/privacy-policy`,
                method:"PUT",
                body:{
                    content}
            }),
            invalidatesTags:["PrivacyPolicy"]
        })
    })
})
export const {usePostPricyPolicyApiMutation} = postPrivacyPolicyApi;