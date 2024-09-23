import { baseApi } from "../api/baseApi";

const getAboutUsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAboutUs:builder.query({
            query:()=>`/setting/about-us`,
            providesTags:["AboutUs"]
        })
    })
})

export const {useGetAboutUsQuery} = getAboutUsApi;