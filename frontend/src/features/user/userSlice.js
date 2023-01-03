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
       AllUsersRoleInfo:{
        AllUsersRole:[],
        isErrorAllUsersRole:false,
       isSuccessAllUsersRole:false,
       isLoadingAllUsersRole:false,
       messageAllUsersRole:''
    },
    AddRoleInfo:{
        isErrorAddRole:false,
        isSuccessAddRole:false,
        isLoadingAddRole:false,
        messageAddRole:''
     },
     RemoveRoleInfo:{
        isErrorRemoveRole:false,
        isSuccessRemoveRole:false,
        isLoadingRemoveRole:false,
        messageRemoveRole:''
     },
    
     AllUserFavoriteInfo:{
        AllUserFavorite:[],
        isErrorAllUserFavorite:false,
       isSuccessAllUserFavorite:false,
       isLoadingAllUserFavorite:false,
       messageAllUserFavorite:''
    },
    AllUserBlackListedInfo:{
        AllUserBlackListed:[],
        isErrorAllUserBlackListed:false,
       isSuccessAllUserBlackListed:false,
       isLoadingAllUserBlackListed:false,
       messageAllUserBlackListed:''
    },
    AllUserPropInfo:{
        AllUserProp:[],
        isErrorAllUserProp:false,
       isSuccessAllUserProp:false,
       isLoadingAllUserProp:false,
       messageAllUserProp:''
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

//get all users role
export const getAllUsersRole=createAsyncThunk('users/getAllbyrol',async(role,thunkAPI)=>{
    try {
        
        return await userService.getAllUsersRole(role)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

// user add Role
export const addRole=createAsyncThunk('users/addRole',async(userIdAndRole,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.addRole(userIdAndRole,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

// user delete Role
export const removeRole=createAsyncThunk('users/removeRole',async(userIdAndRole,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.removeRole(userIdAndRole,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

// add Faovorite
export const addFavorite=createAsyncThunk('users/addFav',async(userIdAndVoitureId,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.addFavorite(userIdAndVoitureId,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

// get Faovorites of a user
export const getFavoriteUser=createAsyncThunk('users/getAllFav',async(id,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.getFavoriteUser(id,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

// delete Faovorite
export const deleteFavorite=createAsyncThunk('users/deleteFav',async(userIdAndVoitureId,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.deleteFavorite(userIdAndVoitureId,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

// get Users blacklisted
export const getUsersByRolesBlackList=createAsyncThunk('users/getBlackListed',async(_,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.getUsersByRolesBlackList(_,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

// get Users Prop
export const getUsersByRolesProp=createAsyncThunk('users/getProp',async(_,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.getUsersByRolesProp(_,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
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
     /////////////////////////
     .addCase(getAllUsersRole.pending,(state)=>{
        state.AllUsersRoleInfo.isLoadingAllUsersRole=true
    })
        .addCase(getAllUsersRole.fulfilled,(state,action)=>{
        state.AllUsersRoleInfo.isLoadingAllUsersRole=false
        state.AllUsersRoleInfo.isSuccessAllUsersRole= true       
        state.AllUsersRoleInfo.AllUsersRole=action.payload 
    })
        .addCase(getAllUsersRole.rejected,(state,action)=>{
        state.AllUsersRoleInfo.isLoadingAllUsersRole=false
        state.AllUsersRoleInfo.isErrorAllUsersRole=true
        state.AllUsersRoleInfo.messageAllUsersRole=action.payload 
    })

    //////////////////
    .addCase(addRole.pending,(state)=>{
        state.AddRoleInfo.isLoadingAddRole=true
    })
        .addCase(addRole.fulfilled,(state,action)=>{
        state.AddRoleInfo.isLoadingAddRole=false
        state.AddRoleInfo.isSuccessAddRole= true       
 
    })
        .addCase(addRole.rejected,(state,action)=>{
        state.AddRoleInfo.isLoadingAddRole=false
        state.AddRoleInfo.isErrorAddRole=true
        state.AddRoleInfo.messageAddRole=action.payload 
    })

       //////////////////
       .addCase(removeRole.pending,(state)=>{
        state.RemoveRoleInfo.isLoadingRemoveRole=true
    })
        .addCase(removeRole.fulfilled,(state,action)=>{
        state.RemoveRoleInfo.isLoadingRemoveRole=false
        state.RemoveRoleInfo.isSuccessRemoveRole= true       
 
    })
        .addCase(removeRole.rejected,(state,action)=>{
        state.RemoveRoleInfo.isLoadingRemoveRole=false
        state.RemoveRoleInfo.isErrorRemoveRole=true
        state.RemoveRoleInfo.messageRemoveRole=action.payload 
    })
    
     /////////////////////////
     .addCase(getFavoriteUser.pending,(state)=>{
        state.AllUserFavoriteInfo.isLoadingAllUserFavorite=true
    })
        .addCase(getFavoriteUser.fulfilled,(state,action)=>{
        state.AllUserFavoriteInfo.isLoadingAllUserFavorite=false
        state.AllUserFavoriteInfo.isSuccessAllUserFavorite= true       
        state.AllUserFavoriteInfo.AllUserFavorite=action.payload 
    })
        .addCase(getFavoriteUser.rejected,(state,action)=>{
        state.AllUserFavoriteInfo.isLoadingAllUserFavorite=false
        state.AllUserFavoriteInfo.isErrorAllUserFavorite=true
        state.AllUserFavoriteInfo.messageAllUserFavorite=action.payload 
    })  

    /////////////////////////
    .addCase(getUsersByRolesBlackList.pending,(state)=>{
        state.AllUserBlackListedInfo.isLoadingAllUserBlackListed=true
    })
        .addCase(getUsersByRolesBlackList.fulfilled,(state,action)=>{
        state.AllUserBlackListedInfo.isLoadingAllUserBlackListed=false
        state.AllUserBlackListedInfo.isSuccessAllUserBlackListed= true       
        state.AllUserBlackListedInfo.AllUserBlackListed=action.payload 
    })
        .addCase(getUsersByRolesBlackList.rejected,(state,action)=>{
        state.AllUserBlackListedInfo.isLoadingAllUserBlackListed=false
        state.AllUserBlackListedInfo.isErrorAllUserBlackListed=true
        state.AllUserBlackListedInfo.messageAllUserBlackListed=action.payload 
    })  

     /////////////////////////
     .addCase(getUsersByRolesProp.pending,(state)=>{
        state.AllUserPropInfo.isLoadingAllUserProp=true
    })
        .addCase(getUsersByRolesProp.fulfilled,(state,action)=>{
        state.AllUserPropInfo.isLoadingAllUserProp=false
        state.AllUserPropInfo.isSuccessAllUserProp= true       
        state.AllUserPropInfo.AllUserProp=action.payload 
    })
        .addCase(getUsersByRolesProp.rejected,(state,action)=>{
        state.AllUserPropInfo.isLoadingAllUserProp=false
        state.AllUserPropInfo.isErrorAllUserProp=true
        state.AllUserPropInfo.messageAllUserProp=action.payload 
    })  


}
})

export const {reset}=userSlice.actions
export default userSlice.reducer