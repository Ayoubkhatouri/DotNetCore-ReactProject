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
 

 const demandeService={
    addDemande
 }

 export default demandeService