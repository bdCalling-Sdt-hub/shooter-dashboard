import { baseApi } from "../api/baseApi";

const getTermsConditionApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getTermsCondition:builder.query({
            query:()=>`/setting/terms-condition`,
            providesTags:["TermsAndConditions"]
        })
    })
})

export const {useGetTermsConditionQuery} = getTermsConditionApi;