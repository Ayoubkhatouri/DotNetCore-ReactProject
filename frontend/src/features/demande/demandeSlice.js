import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import demandeService from './demandeService'

const initialState={
    AddDemandeInfo:{
        LoadingAddDemande:false,
        ErrorAddDemande:false,
        messageAddDemande:'',
        SuccessAddDemande:false
    },
}


//add Demande
export const addDemande=createAsyncThunk("/demande/add",async(data,thunkAPI)=>{
    try {
        await demandeService.addDemande(data,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const demandeSlice=createSlice({
    name:'demande',
    initialState,
    reducers:{
        reset:(state)=>{}
        },

        extraReducers:(builder)=>{
            builder
            ///////////////////////////////
.addCase(addDemande.pending,(state)=>{
    state.AddDemandeInfo.LoadingAddDemande=true
})
    .addCase(addDemande.fulfilled,(state,action)=>{
    state.AddDemandeInfo.LoadingAddDemande=false
    state.AddDemandeInfo.SuccessAddDemande= true       
})
    .addCase(addDemande.rejected,(state,action)=>{
        state.AddDemandeInfo.LoadingAddDemande=false
        state.AddDemandeInfo.ErrorAddDemande= true  
        state.AddDemandeInfo.messageAddDemande=action.payload 
})
        }
    }


)


export const {reset}=demandeSlice.actions
export default demandeSlice.reducer


