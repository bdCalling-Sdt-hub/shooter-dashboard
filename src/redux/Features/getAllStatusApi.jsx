import { baseApi } from "../api/baseApi";

const getAllStatusApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllStatus:builder.query({
            query:()=>`/admin/status`
        })
    })
})

export const {useGetAllStatusQuery} = getAllStatusApi;