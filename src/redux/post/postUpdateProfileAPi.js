import { baseApi } from "../api/baseApi";


const postUploadProfileApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getUploadProfileApi:builder.mutation({
            query:({formData,id})=>({
                url:`user/update/${id}`,
                method:"PATCH",
                body:formData
            }),
            invalidatesTags:["user"]
        })
    })
})
export const {useGetUploadProfileApiMutation} = postUploadProfileApi;