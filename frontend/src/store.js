import { configureStore } from "@reduxjs/toolkit";  
import userReducer from './features/user/userSlice'
import carReducer from './features/car/carSlice'
import demandeReducer from './features/demande/demandeSlice'


export const store=configureStore({
reducer:{
    user:userReducer,
    car:carReducer,
    demande:demandeReducer
}
})