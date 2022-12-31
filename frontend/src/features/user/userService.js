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
const getAllUsers=async(token)=>{
    
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





const userService={
    login,
    register,
    getAllUsers,
    getUserDetails,
    updateUser
}

export default userService