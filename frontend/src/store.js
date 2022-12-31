import { configureStore } from "@reduxjs/toolkit";  
import userReducer from './features/user/userSlice'
import carReducer from './features/car/carSlice'


export const store=configureStore({
reducer:{
    user:userReducer,
    car:carReducer
}
})