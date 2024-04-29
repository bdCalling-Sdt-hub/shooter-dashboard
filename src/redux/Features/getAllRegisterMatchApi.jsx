import { baseApi } from "../api/baseApi";

const getAllRegisterMatchApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllRegisterEvent:builder.query({
            query:()=>`match/all-register-matches`
        })
    })
})

export const {useGetAllRegisterEventQuery} = getAllRegisterMatchApi;