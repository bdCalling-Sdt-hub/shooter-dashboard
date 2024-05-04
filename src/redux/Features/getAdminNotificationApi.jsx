import { baseApi } from "../api/baseApi";

const getAdminNotificationApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAdminNotification:builder.query({
            query:(currentPage)=>`/notification/admin?page=${currentPage}&limit=10`,
        })
    })
})

export const {useGetAdminNotificationQuery} = getAdminNotificationApi;