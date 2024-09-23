import { baseApi } from "../api/baseApi";


const postAboutUsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postAboutUs:builder.mutation({
            query:({content})=>(
                {
                url:`/setting/about-us`,
                method:"PUT",
                body:{
                    content}
            }),
            invalidatesTags:["AboutUs"]
        })
    })
})
export const {usePostAboutUsMutation} = postAboutUsApi;