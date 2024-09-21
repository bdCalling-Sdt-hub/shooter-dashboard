// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// export const baseApi = createApi({
//     reducerPath:'api',
//     baseQuery:fetchBaseQuery({
//         baseUrl:'https://api.techaim.technology/api/v1',
//         // baseUrl:'http://192.168.10.46:3232/api/v1',
//         headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${localStorage.getItem("token")}`,
//         }
//     }),
//     tagTypes:[],
//     endpoints:()=>({
//         // getUser:builder.query({
//         //     query:()=>'/users'
//         // })
//     })
// })

// export const {useGetUserQuery} = baseApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// "http://192.168.10.35:8000/api"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      // console.log("token----=-=-=-==-=-=", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("X-Custom-Header", "foobar");
      return headers;
    },
  }),
  tagTypes: [
    "auth",
    "user",
    "event",
    "subscription",
    "photo",
    "documents"
  ],
  endpoints: () => ({}),
});
