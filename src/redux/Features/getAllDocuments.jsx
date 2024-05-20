import { baseApi } from "../api/baseApi";

const getAboutUsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAboutUs:builder.query({
            query:()=>`/setting/about-us`,
        })
    })
})

export const {useGetAboutUsQuery} = getAboutUsApi;