import { baseApi } from "../api/baseApi";


const postTermsAndConditionsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postTermsAndConditions:builder.mutation({
            query:({content})=>(
                {
                url:`/setting/terms-condition`,
                method:"PUT",
                body:{
                    content}
            }),
            invalidatesTags:["TermsAndConditions"]
        })
    })
})
export const {usePostTermsAndConditionsMutation} = postTermsAndConditionsApi;