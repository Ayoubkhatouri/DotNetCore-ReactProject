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
   console.log(car)

   await axios.put(`/api/Voiture/${car.id}`,car,config)
}

 //delete car
 const deleteCar=async(id,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userLogin=state.user.userLogin
   
   const config={
       headers:{
           Authorization:`Bearer ${userLogin.token}`
       }
   }
   await axios.delete(`/api/Voiture/${id}`,config)
}

// add Marque
const addMarque=async(nomMarque,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userLogin=state.user.userLogin
   
   const config={
       headers:{
           Authorization:`Bearer ${userLogin.token}`
       }
   }
   await axios.post(`/api/Marque`,nomMarque,config)
}

// add Model
const addModele=async(marqueIdAndNomModel,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userLogin=state.user.userLogin
   
   const config={
       headers:{
           Authorization:`Bearer ${userLogin.token}`
       }
   }
   await axios.post(`/api/Modele`,marqueIdAndNomModel,config)
}

 //update offre
 const updateOffre=async(carIdAndOffrePrice,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userLogin=state.user.userLogin

   const config={
       headers:{
           Authorization:`Bearer ${userLogin.token}`
       }
   }

   await axios.put(`/api/Offre/${carIdAndOffrePrice.voitureId}`,carIdAndOffrePrice,config)
}

 //delete Offre Special
 const deleteOffre=async(id,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userLogin=state.user.userLogin
   
   const config={
       headers:{
           Authorization:`Bearer ${userLogin.token}`
       }
   }
   await axios.delete(`/api/Offre/${id}`,config)
}

// add Offre
const addOffre=async(carIdAndOffrePrice,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userLogin=state.user.userLogin
   
   const config={
       headers:{
           Authorization:`Bearer ${userLogin.token}`
       }
   }
   await axios.post(`/api/Offre`,carIdAndOffrePrice,config)
}

// get alla coments of a car
const getAllComments=async(id)=>{
   const {data}=await axios.get(`/api/Comment/${id}`)
   return data
}


//create   a commente
const addComment=async(objData)=>{
   const response=await axios.post('/api/Comment',objData)
   return  response.data
}

//delete  a commente
const deleteComment=async(idComm)=>{
   const response=await axios.delete(`/api/Comment/${idComm}`)
   return  response.data
}

//create   a commente
const addReview=async(objData)=>{
   const response=await axios.post('/api/Review',objData)
   return  response.data
}

//getAllReview of a car
const getAllReview=async()=>{
   const {data}=await axios.get(`/api/Review`)
   return data
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
    updateCar  ,
    deleteCar,
    addMarque,
    addModele,
    updateOffre,
    deleteOffre,
    addOffre,
    getAllComments,
    addComment,
    deleteComment,
    addReview,
    getAllReview
 }

 export default carService