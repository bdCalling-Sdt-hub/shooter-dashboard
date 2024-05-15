import { baseApi } from "../api/baseApi";

const getEventREgisterListDetailsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getEventREgisterListDetails:builder.query({
            query:({id,currentPage})=>`/events/user-registration/${id}?limit=8&page=${currentPage}`,
        })
    })
})

export const {useGetEventREgisterListDetailsQuery} = getEventREgisterListDetailsApi;