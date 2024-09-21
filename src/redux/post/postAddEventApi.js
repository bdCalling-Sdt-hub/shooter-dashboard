import { baseApi } from "../api/baseApi";


const postAddEventApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postAddEventApi:builder.mutation({
            query:({formData})=>({
                url:`/events/add`,
                method:"POST",
                body:formData
            }),
            invalidatesTags:["event"]
        })
    })
})
export const {usePostAddEventApiMutation} = postAddEventApi;