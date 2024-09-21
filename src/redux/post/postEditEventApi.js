import { baseApi } from "../api/baseApi";


const postEditEventApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postEditEvent:builder.mutation({
            query:({formData,id})=>({
                url:`/events/update/${id}`,
                method:"PUT",
                body:formData
            }),
            invalidatesTags:["event"]
        })
    })
})
export const {usePostEditEventMutation} = postEditEventApi;