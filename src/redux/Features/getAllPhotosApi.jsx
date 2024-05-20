import { baseApi } from "../api/baseApi";

const getAllPhotosApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllPhotos:builder.query({
            query:()=>`/library/photos`,
        })
    })
})

export const {useGetAllPhotosQuery} = getAllPhotosApi;