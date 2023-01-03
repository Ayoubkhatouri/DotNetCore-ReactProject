import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import demandeService from './demandeService'

const initialState={
    AddDemandeInfo:{
        LoadingAddDemande:false,
        ErrorAddDemande:false,
        messageAddDemande:'',
        SuccessAddDemande:false
    },
    getAllDemandeInfo:{
        AllDemande:[],
        LoadinggetAllDemande:false,
        ErrorgetAllDemande:false,
        messagegetAllDemande:'',
        SuccessgetAllDemande:false
    },
    getAllDemandeReceiveInfo:{
        AllDemandeReceive:[],
        LoadinggetAllDemandeReceive:false,
        ErrorgetAllDemandeReceive:false,
        messagegetAllDemandeReceive:'',
        SuccessgetAllDemandeReceive:false
    },
    getAllDemandeMadeByUserInfo:{
        AllDemandeMadeByUser:[],
        LoadinggetAllDemandeMadeByUser:false,
        ErrorgetAllDemandeMadeByUser:false,
        messagegetAllDemandeMadeByUser:'',
        SuccessgetAllDemandeMadeByUser:false
    },
    updateDemandeInfo:{
        LoadingupdateDemande:false,
        ErrorupdateDemande:false,
        messageupdateDemande:'',
        SuccessupdateDemande:false
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

//get all Demande
export const getAllDemande=createAsyncThunk("/demande/getAll",async(_,thunkAPI)=>{
    try {
       return await demandeService.getAllDemande()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all Demande Prop
export const getAllDemandeReceive=createAsyncThunk("/demande/getAllProp",async(id,thunkAPI)=>{
    try {
       return await demandeService.getAllDemandeReceive(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all Demande Made by a user
export const getAllDemandeMadeByUser=createAsyncThunk("/demande/getAllMadeByuSER",async(id,thunkAPI)=>{
    try {
       return await demandeService.getAllDemandeMadeByUser(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update demande
export const updateDemande=createAsyncThunk("/demande/update",async(obj,thunkAPI)=>{
    try {
       return await demandeService.updateDemande(obj,thunkAPI)
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
  ///////////////////////////////
  .addCase(getAllDemande.pending,(state)=>{
    state.getAllDemandeInfo.LoadinggetAllDemande=true
})
    .addCase(getAllDemande.fulfilled,(state,action)=>{
        state.getAllDemandeInfo.AllDemande=action.payload
    state.getAllDemandeInfo.LoadinggetAllDemande=false
    state.getAllDemandeInfo.SuccessgetAllDemande= true       
})
    .addCase(getAllDemande.rejected,(state,action)=>{
        state.getAllDemandeInfo.LoadinggetAllDemande=false
        state.getAllDemandeInfo.ErrorgetAllDemande= true  
        state.getAllDemandeInfo.messagegetAllDemande=action.payload 
})

 ///////////////////////////////
 .addCase(getAllDemandeReceive.pending,(state)=>{
    state.getAllDemandeReceiveInfo.LoadinggetAllDemandeReceive=true
})
    .addCase(getAllDemandeReceive.fulfilled,(state,action)=>{
        state.getAllDemandeReceiveInfo.AllDemandeReceive=action.payload
    state.getAllDemandeReceiveInfo.LoadinggetAllDemandeReceive=false
    state.getAllDemandeReceiveInfo.SuccessgetAllDemandeReceive= true       
})
    .addCase(getAllDemandeReceive.rejected,(state,action)=>{
        state.getAllDemandeReceiveInfo.LoadinggetAllDemandeReceive=false
        state.getAllDemandeReceiveInfo.ErrorgetAllDemandeReceive= true  
        state.getAllDemandeReceiveInfo.messagegetAllDemandeReceive=action.payload 
})
 ///////////////////////////////
 .addCase(getAllDemandeMadeByUser.pending,(state)=>{
    state.getAllDemandeMadeByUserInfo.LoadinggetAllDemandeMadeByUser=true
})
    .addCase(getAllDemandeMadeByUser.fulfilled,(state,action)=>{
        state.getAllDemandeMadeByUserInfo.AllDemandeMadeByUser=action.payload
    state.getAllDemandeMadeByUserInfo.LoadinggetAllDemandeMadeByUser=false
    state.getAllDemandeMadeByUserInfo.SuccessgetAllDemandeMadeByUser= true       
})
    .addCase(getAllDemandeMadeByUser.rejected,(state,action)=>{
        state.getAllDemandeMadeByUserInfo.LoadinggetAllDemandeMadeByUser=false
        state.getAllDemandeMadeByUserInfo.ErrorgetAllDemandeMadeByUser= true  
        state.getAllDemandeMadeByUserInfo.messagegetAllDemandeMadeByUser=action.payload 
})

.addCase(updateDemande.pending,(state)=>{
    state.updateDemandeInfo.LoadingupdateDemande=true
})
    .addCase(updateDemande.fulfilled,(state,action)=>{
    state.updateDemandeInfo.LoadingupdateDemande=false
    state.updateDemandeInfo.SuccessupdateDemande= true       
})
    .addCase(updateDemande.rejected,(state,action)=>{
        state.updateDemandeInfo.LoadingupdateDemande=false
        state.updateDemandeInfo.ErrorupdateDemande= true  
        state.updateDemandeInfo.messageupdateDemande=action.payload 
})

        }
    }


)


export const {reset}=demandeSlice.actions
export default demandeSlice.reducer


