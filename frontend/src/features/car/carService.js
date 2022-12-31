import axios from "axios";

//get all cars
const listAllCars=async()=>{
   let response
   response=await axios.get('/api/Voiture/valid')

   return response.data
}

//create a car
const addCar=async(car,thunkAPI)=>{
    //get user info
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
    const config={
      headers:{
         Authorization:`Bearer ${userLogin.token}`,
      }
   }
   await axios.post(`/api/Voiture`,car,config)
 
   
 }
 
 //get all marques
 const getallMarque=async()=>{
   const {data}=await axios.get(`/api/Marque`)
   return data
}

 //get marque by id
const getMarque=async(id)=>{
   const {data}=await axios.get(`/api/Marque/${id}`)
   return data
}

 //get all models
 const getallModele=async()=>{
   const {data}=await axios.get(`/api/Modele`)
   return data
}

//get a model by id
const getModel=async(id)=>{
   const {data}=await axios.get(`/api/Modele/${id}`)
   return data
}

//get a single car by id
const listSingleCar=async(id)=>{
   const {data}=await axios.get(`/api/Voiture/${id}`)
   return data
}

//get all cars of a user
const allCarsOfUser=async(id)=>{
   const {data}=await axios.get(`/api/Voiture/user/${id}`)
   return data
}


//get all offre special
const allOffresSpecial=async()=>{
   const {data}=await axios.get(`/api/Offre`)
   return data
}

//test if a car is offre special
const isOffreSpecial=async(id)=>{
   const {data} = await axios.get(`/api/Offre/exist/${id}`)
   return data
}

 //update car
 const updateCar=async(car,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userLogin=state.user.userLogin

   const config={
       headers:{
           Authorization:`Bearer ${userLogin.token}`
       }
   }

   await axios.put(`/api/Voiture/${car._id}`,car,config)
}




 const carService={
   listAllCars,
    addCar,
    getMarque,
    getModel,
    getallMarque,
    getallModele,
    listSingleCar,
    allCarsOfUser,
    allOffresSpecial,
    isOffreSpecial,
    updateCar  
 }

 export default carService