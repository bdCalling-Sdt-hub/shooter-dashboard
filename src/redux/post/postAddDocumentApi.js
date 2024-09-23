import { baseApi } from "../api/baseApi";


const postAddDocumentationApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postAddDocument:builder.mutation({
            query:({formData})=>({
                url:`/library/documents`,
                method:"POST",
                body:formData
            }),
            invalidatesTags:["documents"]
        })
    })
})
export const {usePostAddDocumentMutation} = postAddDocumentationApi;