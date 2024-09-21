import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
// import loginSlice from './apiSlices/authentication/loginSlice'


export const store = configureStore({
  reducer: {
    //authentication start
    // login:loginSlice,
    [baseApi.reducerPath]: baseApi.reducer,

  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(baseApi.middleware)
  }
})