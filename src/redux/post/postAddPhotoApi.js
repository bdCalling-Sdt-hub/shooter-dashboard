import { baseApi } from "../api/baseApi";


const postAddPhotoApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postAddPhoto:builder.mutation({
            query:({formData})=>({
                url:`/library/photos`,
                method:"POST",
                body:formData
            }),
            invalidatesTags:["photo"]
        })
    })
})
export const {usePostAddPhotoMutation} = postAddPhotoApi;