import { baseApi } from "../api/baseApi";

const postEventApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postEvent : builder.mutation({
            query:(values)=>{
                console.log(values);
               return {
                url:`/events/add`,
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                    // authorization: `Bearer ${localStorage.getItem('token')}`,
                    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU3MGFlMTE5YjZjYTZmMTgxZDQ5MzEiLCJlbWFpbCI6InBhbGFzaDkwMDIwMkBnbWFpbC5jb20iLCJpYXQiOjE3MDk5NzMxMjIsImV4cCI6MTc0MTUwOTEyMn0.qoMKMYYwB1Lnw2FxwDss0cZQvVw07b99NTWLN-xcPOQ`,
                },
                body:values
            }
        }}),
        // invalidatesTags:['membership']
    })
})

export const {usePostEventMutation} = postEventApi;