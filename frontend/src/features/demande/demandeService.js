import axios from "axios";


// add Demande
const addDemande=async(data,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
    
    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
    await axios.post(`/api/Demande`,data,config)
 }

 // get all Demande
const getAllDemande=async()=>{

    
  
    const {data}=await axios.get(`/api/Demande`)
    return data
 }


  // get all Demande Prop
const getAllDemandeReceive=async(id)=>{
    const {data}=await axios.get(`/api/Demande/proprietaire/${id}`)
    return data
 }

  // get all Demande made by user
const getAllDemandeMadeByUser=async(id,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
    
    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
    const {data}=await axios.get(`/api/Demande/locataire/${id}`,config)
    return data
 }

 
  // update a demande
const updateDemande=async(obj,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
    
    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
    const {data}=await axios.put(`/api/Demande`,obj,config)
    return data
 }
 

 const demandeService={
    addDemande,
    getAllDemande,
    getAllDemandeReceive,
    getAllDemandeMadeByUser,
    updateDemande
 }

 export default demandeService