import { baseApi } from "../api/baseApi";

const getAllDocuments = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllDocuments:builder.query({
            query:()=>`/library/documents`,
        })
    })
})

export const {useGetAllDocumentsQuery} = getAllDocuments;