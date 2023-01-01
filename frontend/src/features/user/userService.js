import axios from "axios"


//Login user
const login=async(userdata)=>{

    const {data}=await axios.post('/api/Auth/login',userdata)//data here is {email,password}
    if(data){
        localStorage.setItem('userLogin',JSON.stringify(data))
    }
    return data
}

//Register user
const register=async(userdata)=>{

    const {data}=await axios.post('/api/Auth/register',userdata)
    if(data){
        localStorage.setItem('userLogin',JSON.stringify(data))
    }
    return data
}


//get all Users Profile
const getAllUsers=async()=>{
    
    const {data}=await axios.get('/api/User')

    return data
}

//get user details
const getUserDetails=async(id)=>{
    const {data}=await axios.get(`/api/User/${id}`)
    return data
}

//Update User Profile
const updateUser=async(userdata,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.put(`/api/User/${userdata.id}`,userdata,config)

   
    return data
}

//get all Users by role
const getAllUsersRole=async(role)=>{
    
    const {data}=await axios.get(`/api/User/search?role=${role}`)

    return data
}

//add role
const addRole=async(userIdAndRole,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.post('/api/Auth/addrole',userIdAndRole,config)
    return data
}

//remove role
const removeRole=async(userIdAndRole,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.post('/api/Auth/removerole',userIdAndRole,config)
    return data
}

// add Favorite
const addFavorite=async(userIdAndVoitureId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.post('/api/Favori',userIdAndVoitureId,config)
    return data
}

//get favorite of a user
const getFavoriteUser=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.get(`/api/Favori/${id}`,config)
    return data
}

// add Favorite
const deleteFavorite=async(userIdAndVoitureId,token)=>{
    
    const {data}=await axios.delete('/api/Favori',{
        headers: {
            Authorization: token
          },
          data: userIdAndVoitureId
    })
    return data
}




const userService={
    login,
    register,
    getAllUsers,
    getUserDetails,
    updateUser,
    getAllUsersRole,
    addRole,
    removeRole,
    addFavorite,
    getFavoriteUser,
    deleteFavorite,
    
}

export default userService