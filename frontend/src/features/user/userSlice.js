import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import userService from './userService'


//get user from local Storage
const userLogin=JSON.parse(localStorage.getItem('userLogin'))

const initialState={
    userLogin:userLogin ? userLogin : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    AllUsersInfo:{
        AllUsers:[],
        isErrorAllUsers:false,
       isSuccessAllUsers:false,
       isLoadingAllUsers:false,
       messageAllUsers:''
    },
    UserDetailsInfo:{
        userDetails:{},
        SuccessgetUserDetails:false,    
        LoadinggetUserDetails:false,
        ErrorgetUserDetails:false,
        messagegetUserDetails:''
    },
    userUpdateInfo:{
        isErrorUpdate:false,
       isSuccessUpdate:false,
       isLoadingUpdate:false,
       messageUpdate:''
       },
}


//login user
export const login=createAsyncThunk('user/login',async(userData,thunkAPI)=>{
    try {
        return await userService.login(userData) //userData={email,password}
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


//register user
export const register=createAsyncThunk('user/register',async(userData,thunkAPI)=>{
    try {
        return await userService.register(userData) 
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all users
export const getAllUsers=createAsyncThunk('users/getAll',async(_,thunkAPI)=>{
    try {
        return await userService.getAllUsers()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

//get user by id
export const getUserDetails=createAsyncThunk('user/details',async(id,thunkAPI)=>{
    try {
        return await userService.getUserDetails(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Update User Profile
export const updateUser=createAsyncThunk('user/update',async(userdata,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.updateUser(userdata,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    

    }
})




export const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
        reset:(state)=>{}
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
        state.isLoading=true
    })
        .addCase(login.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess= true       
        state.userLogin=action.payload 
    })
        .addCase(login.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.userLogin=null
    })

///////////////////////////////////

    .addCase(register.pending,(state)=>{
        state.isLoading=true
    })
        .addCase(register.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess= true       
        state.userLogin=action.payload 
    })
        .addCase(register.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.userLogin=null
    })

       /////////////////////////
       .addCase(getAllUsers.pending,(state)=>{
        state.AllUsersInfo.isLoadingAllUsers=true
    })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
        state.AllUsersInfo.isLoadingAllUsers=false
        state.AllUsersInfo.isSuccessAllUsers= true       
        state.AllUsersInfo.AllUsers=action.payload 
     
    })
        .addCase(getAllUsers.rejected,(state,action)=>{
        state.AllUsersInfo.isLoadingAllUsers=false
        state.AllUsersInfo.isErrorAllUsers=true
        state.AllUsersInfo.messageAllUsers=action.payload 
    })

    /////////////////////////
.addCase(getUserDetails.pending,(state)=>{
    state.UserDetailsInfo.LoadinggetUserDetails=true
})
    .addCase(getUserDetails.fulfilled,(state,action)=>{
    state.UserDetailsInfo.LoadinggetUserDetails=false
    state.UserDetailsInfo.SuccessgetUserDetails= true       
    state.UserDetailsInfo.userDetails=action.payload
})
    .addCase(getUserDetails.rejected,(state,action)=>{
    state.UserDetailsInfo.LoadinggetUserDetails=false
    state.UserDetailsInfo.ErrorgetUserDetails=true
    state.UserDetailsInfo.messagegetUserDetails=action.payload 
})
/////////////////////////
.addCase(updateUser.pending,(state)=>{
    state.userUpdateInfo.isLoadingUpdate=true
})
    .addCase(updateUser.fulfilled,(state,action)=>{
    state.userUpdateInfo.isLoadingUpdate=false
    state.userUpdateInfo.isSuccessUpdate= true       
    state.userLogin=action.payload 
    state.userUpdateInfo.messageUpdate="Les Modifications ont été effectuées avec succès"
})
    .addCase(updateUser.rejected,(state,action)=>{
    state.userUpdateInfo.isLoadingUpdate=false
    state.userUpdateInfo.isErrorUpdate=true
    state.userUpdateInfo.messageUpdate=action.payload 
})
    



}
})

export const {reset}=userSlice.actions
export default userSlice.reducer