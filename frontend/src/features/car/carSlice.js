import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import carService from './carService'


const initialState={
    allCarsInfo:{
        allCars:[],
        allCarsLoading:false,
        allCarsError:false,
        allCarsSucces:false,
        allCarsMessageError:'',
    },
    AddCarInfo:{
        LoadingAdd:false,
        ErrorAdd:false,
        messageAdd:'',
        SuccessAdd:false
    },
    allmarqueInfo:{
        marques:[],
        marqueLoding:false,
        marqueError:false,
        marqueSucces:false,
        marqueMessageError:false,
    },
    allmodelInfo:{
        models:[],
        modelLoding:false,
        modelError:false,
        modelSucces:false,
        modelMessageError:false,
    },
    marqueInfo:{
        marque:{},
        marqueLoding:false,
        marqueError:false,
        marqueSucces:false,
        marqueMessageError:false,
    },
    modelInfo:{
        model:{},
        modelLoding:false,
        modelError:false,
        modelSucces:false,
        modelMessageError:false,
    },
    singleCarInfo:{
        singleCar:{},
        singleCarLoading:false,
        singleCarError:false,
        singleCarSucces:false,
        singleCarMessageError:'',
    },
    allCarsOfUserOfUserInfo:{
        CarsOfUser:[],
        allCarsOfUserLoading:false,
        allCarsOfUserError:false,
        allCarsOfUserSucces:false,
        allCarsOfUserMessageError:'',
    },
    allOffresSpecialInfo:{
       allCarsOffreSpecial:[],
       allCarsOffreSpecialLoading:false,
       allCarsOffreSpecialError:false,
       allCarsOffreSpecialSucces:false,
       allCarsOffreSpecialMessageError:'',
    },
    isOffreSpecialInfo:{
        isOffreSpecialdata:false,
        isOffreSpecialLoading:false,
        isOffreSpecialError:false,
        isOffreSpecialSucces:false,
        isOffreSpecialMessageError:'',
    },
    deleteCarInfo:{
        Loadingdelete:false,
        Errordelete:false,
        messagedelete:'',
        Successdelete:false
    },
    updateCarInfo:{
        NewCar:{},
        Loadingupdate:false,
        Errorupdate:false,
        messageupdate:'',
        Successupdate:false,
    },
    AddMarqueInfo:{
        LoadingAddMarque:false,
        ErrorAddMarque:false,
        messageAddMarque:'',
        SuccessAddMarque:false
    },
    AddModeleInfo:{
        LoadingAddModele:false,
        ErrorAddModele:false,
        messageAddModele:'',
        SuccessAddModele:false
    },
    updateOffreInfo:{
        NewOffre:{},
        Loadingupdate:false,
        Errorupdate:false,
        messageupdate:'',
        Successupdate:false,
    },
    deleteOffreInfo:{
        Loadingdelete:false,
        Errordelete:false,
        messagedelete:'',
        Successdelete:false
    },
    AddOffreInfo:{
        LoadingAddOffre:false,
        ErrorAddOffre:false,
        messageAddOffre:'',
        SuccessAddOffre:false
    },
  

}

//get all cars
export const listAllCars=createAsyncThunk('car/getAll',async(_,thunkAPI)=>{
    try {
        return await carService.listAllCars()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//add a car
export const addCar=createAsyncThunk('car/Add',async(car,thunkAPI)=>{
    try {

         await carService.addCar(car,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all marques
export const getallMarque=createAsyncThunk('marque/all',async(_,thunkAPI)=>{
    try {
        return await carService.getallMarque()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all models
export const getallModele=createAsyncThunk('model/all',async(_,thunkAPI)=>{
    try {
        return await carService.getallModele()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get  marque by id
export const getMarque=createAsyncThunk('marque/single',async(id,thunkAPI)=>{
    try {
        return await carService.getMarque(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all models
export const getModel=createAsyncThunk('model/single',async(id,thunkAPI)=>{
    try {
        return await carService.getModel(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get a single car
export const listSingleCar=createAsyncThunk('car/getSingle',async(id,thunkAPI)=>{
    try {
        return await carService.listSingleCar(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get a single car
export const allCarsOfUser=createAsyncThunk('car/Auser',async(id,thunkAPI)=>{
    try {
        return await carService.allCarsOfUser(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all cars offre special
export const allOffresSpecial=createAsyncThunk('car/getAllOff',async(_,thunkAPI)=>{
    try {
        return await carService.allOffresSpecial()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//test for a car is offre special
export const isOffreSpecial=createAsyncThunk('car/offreSpecial',async(id,thunkAPI)=>{
    try {
        return await carService.isOffreSpecial(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update a car
export const updateCar=createAsyncThunk('car/update',async(car,thunkAPI)=>{
    try {
        await carService.updateCar(car,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete a car
export const deleteCar=createAsyncThunk("/car/delete",async(id,thunkAPI)=>{
    try {
        await carService.deleteCar(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//add a marque
export const addMarque=createAsyncThunk("/marque/add",async(nomMarque,thunkAPI)=>{
    try {
        await carService.addMarque(nomMarque,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//add a modele
export const addModele=createAsyncThunk("/modele/add",async(marqueIdAndNomModel,thunkAPI)=>{
    try {
        await carService.addModele(marqueIdAndNomModel,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update an Offre
export const updateOffre=createAsyncThunk('offre/update',async(carIdAndOffrePrice,thunkAPI)=>{
    try {
        await carService.updateOffre(carIdAndOffrePrice,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete offre Special
export const deleteOffre=createAsyncThunk("/offre/delete",async(id,thunkAPI)=>{
    try {
        await carService.deleteOffre(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//add offre
export const addOffre=createAsyncThunk("/offre/add",async(carIdAndOffrePrice,thunkAPI)=>{
    try {
        await carService.addOffre(carIdAndOffrePrice,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const carSlice=createSlice({
    name:'car',
    initialState,
    reducers:{
        reset1:(state)=>{
            state.AddCarInfo={
            LoadingAdd:false,
            SuccessAdd:false,
            ErrorAdd:false,
            messageAdd:''
        }
    },
    reset2:(state)=>{
       state.allCarsInfo={
            allCars:[],
            allCarsLoading:false,
            allCarsError:false,
            allCarsSucces:false,
            allCarsMessageError:''
        }
    },
    reset3:(state)=>{
        state.singleCarInfo={
            singleCar:{},
            singleCarLoading:false,
            singleCarError:false,
            singleCarSucces:false,
            singleCarMessageError:'',
        }
    },
    reset4:(state)=>{
        state.isOffreSpecialInfo={
            isOffreSpecialdata:false,
            isOffreSpecialLoading:false,
            isOffreSpecialError:false,
            isOffreSpecialSucces:false,
            isOffreSpecialMessageError:'',
        }
    }},

    
    extraReducers:(builder)=>{
        builder
        .addCase(listAllCars.pending,(state)=>{
            state.allCarsInfo.allCarsLoading=true
        })
        .addCase(listAllCars.fulfilled,(state,action)=>{
             state.allCarsInfo.allCarsLoading=false
             state.allCarsInfo.allCarsSucces=true
           
             state.allCarsInfo.allCars=action.payload 
           
        })
        .addCase(listAllCars.rejected,(state,action)=>{
             state.allCarsInfo.allCarsLoading=false
             state.allCarsInfo.allCarsError=true
             state.allCarsInfo.allCarsMessageError=action.payload 
        })
///////////////////////////////
    .addCase(addCar.pending,(state)=>{
        state.AddCarInfo.LoadingAdd=true
    })
        .addCase(addCar.fulfilled,(state,action)=>{
        state.AddCarInfo.LoadingAdd=false
        state.AddCarInfo.SuccessAdd= true       
    })
        .addCase(addCar.rejected,(state,action)=>{
            state.AddCarInfo.LoadingAdd=false
            state.AddCarInfo.ErrorAdd= true  
            state.AddCarInfo.messageAdd=action.payload 
    })
    ///////////////////////////////
    .addCase(getallMarque.pending,(state)=>{
        state.allmarqueInfo.marqueLoding=true
    })
        .addCase(getallMarque.fulfilled,(state,action)=>{
        state.allmarqueInfo.marqueLoding=false
        state.allmarqueInfo.marqueSucces= true
        state.allmarqueInfo.marques=action.payload
    })
        .addCase(getallMarque.rejected,(state,action)=>{
            state.allmarqueInfo.marqueLoding=false
            state.allmarqueInfo.marqueError= true  
            state.allmarqueInfo.marqueMessageError=action.payload 
    })
    ///////////////////////////////
        .addCase(getallModele.pending,(state)=>{
        state.allmodelInfo.modelLoding=true
    })
        .addCase(getallModele.fulfilled,(state,action)=>{
        state.allmodelInfo.modelLoding=false
        state.allmodelInfo.modelSucces= true  
        state.allmodelInfo.models=action.payload     
    })
        .addCase(getallModele.rejected,(state,action)=>{
            state.allmodelInfo.modelLoding=false
            state.allmodelInfo.modelError= true  
            state.allmodelInfo.modelMessageError=action.payload 
    })
    ///////////////////////////////
    .addCase(getModel.pending,(state)=>{
        state.modelInfo.modelLoding=true
    })
        .addCase(getModel.fulfilled,(state,action)=>{
        state.modelInfo.modelLoding=false
        state.modelInfo.modelSucces= true  
        state.modelInfo.model=action.payload     
    })
        .addCase(getModel.rejected,(state,action)=>{
            state.modelInfo.modelLoding=false
            state.modelInfo.modelError= true  
            state.modelInfo.modelMessageError=action.payload 
    })
      ///////////////////////////////
      .addCase(getMarque.pending,(state)=>{
        state.marqueInfo.modelLoding=true
    })
        .addCase(getMarque.fulfilled,(state,action)=>{
        state.marqueInfo.marqueLoding=false
        state.marqueInfo.marqueSucces= true  
        state.marqueInfo.marque=action.payload     
    })
        .addCase(getMarque.rejected,(state,action)=>{
            state.marqueInfo.marqueLoding=false
            state.marqueInfo.marqueError= true  
            state.marqueInfo.marqueMessageError=action.payload 
    })
    ///////////////////////////////
    .addCase(listSingleCar.pending,(state)=>{
        state.singleCarInfo.singleCarLoading=true
    })
    .addCase(listSingleCar.fulfilled,(state,action)=>{
        state.singleCarInfo.singleCarLoading=false
        state.singleCarInfo.singleCarSucces=true
        state.singleCarInfo.singleCar=action.payload 
    })
    .addCase(listSingleCar.rejected,(state,action)=>{
        state.singleCarInfo.singleCarLoading=false
        state.singleCarInfo.singleCarError=true
        state.singleCarInfo.singleCarMessageError=action.payload 
    })
        ///////////////////////////////
        .addCase(allCarsOfUser.pending,(state)=>{
            state.allCarsOfUserOfUserInfo.allCarsOfUserLoading=true
        })
        .addCase(allCarsOfUser.fulfilled,(state,action)=>{
            state.allCarsOfUserOfUserInfo.allCarsOfUserLoading=false
            state.allCarsOfUserOfUserInfo.allCarsOfUserSucces=true
            state.allCarsOfUserOfUserInfo.CarsOfUser=action.payload 
        })
        .addCase(allCarsOfUser.rejected,(state,action)=>{
            state.allCarsOfUserOfUserInfo.allCarsOfUserLoading=false
            state.allCarsOfUserOfUserInfo.allCarsOfUserError=true
            state.allCarsOfUserOfUserInfo.allCarsOfUserMessageError=action.payload 
        })
           ///////////////////////////////
           .addCase(allOffresSpecial.pending,(state)=>{
            state.allOffresSpecialInfo.allCarsOffreSpecialLoading=true
        })
        .addCase(allOffresSpecial.fulfilled,(state,action)=>{
            state.allOffresSpecialInfo.allCarsOffreSpecialLoading=false
            state.allOffresSpecialInfo.allCarsOffreSpecialSucces=true
            state.allOffresSpecialInfo.allCarsOffreSpecial=action.payload 
        })
        .addCase(allOffresSpecial.rejected,(state,action)=>{
            state.allOffresSpecialInfo.allCarsOffreSpecialLoading=false
            state.allOffresSpecialInfo.allCarsOffreSpecialError=true
            state.allOffresSpecialInfo.allCarsOffreSpecialMessageError=action.payload 
        })
               ///////////////////////////////
               .addCase(isOffreSpecial.pending,(state)=>{
                state.isOffreSpecialInfo.isOffreSpecialLoading=true
            })
            .addCase(isOffreSpecial.fulfilled,(state,action)=>{
                state.isOffreSpecialInfo.isOffreSpecialLoading=false
                state.isOffreSpecialInfo.isOffreSpecialSucces=true
                state.isOffreSpecialInfo.isOffreSpecialdata=action.payload 
            })
            .addCase(isOffreSpecial.rejected,(state,action)=>{
                state.isOffreSpecialInfo.isOffreSpecialLoading=false
                state.isOffreSpecialInfo.isOffreSpecialError=true
                state.isOffreSpecialInfo.isOffreSpecialMessageError=action.payload 
            })
            
            .addCase(deleteCar.pending,(state)=>{
                state.deleteCarInfo.Loadingdelete=true
            })
                .addCase(deleteCar.fulfilled,(state,action)=>{
                state.deleteCarInfo.Loadingdelete=false
                state.deleteCarInfo.Successdelete= true 
            
            })
                .addCase(deleteCar.rejected,(state,action)=>{
                    state.deleteCarInfo.Loadingdelete=false
                    state.deleteCarInfo.Errordelete= true  
                    state.deleteCarInfo.messagedelete=action.payload   
            })
            
        .addCase(updateCar.pending,(state)=>{
            state.updateCarInfo.Loadingupdate=true
        })
            .addCase(updateCar.fulfilled,(state,action)=>{
            state.updateCarInfo.Loadingupdate=false
            state.updateCarInfo.Successupdate= true 
        
        })
            .addCase(updateCar.rejected,(state,action)=>{
                state.updateCarInfo.Loadingupdate=false
                state.updateCarInfo.Errorupdate= true  
                state.updateCarInfo.messageupdate=action.payload   
        })
        
///////////////////////////////
.addCase(addMarque.pending,(state)=>{
    state.AddMarqueInfo.LoadingAddMarque=true
})
    .addCase(addMarque.fulfilled,(state,action)=>{
    state.AddMarqueInfo.LoadingAddMarque=false
    state.AddMarqueInfo.SuccessAddMarque= true       
})
    .addCase(addMarque.rejected,(state,action)=>{
        state.AddMarqueInfo.LoadingAddMarque=false
        state.AddMarqueInfo.ErrorAddMarque= true  
        state.AddMarqueInfo.messageAddMarque=action.payload 
})
   ///////////////////////////////
.addCase(addModele.pending,(state)=>{
    state.AddModeleInfo.LoadingAddModele=true
})
    .addCase(addModele.fulfilled,(state,action)=>{
    state.AddModeleInfo.LoadingAddModele=false
    state.AddModeleInfo.SuccessAddModele= true       
})
    .addCase(addModele.rejected,(state,action)=>{
        state.AddModeleInfo.LoadingAddModele=false
        state.AddModeleInfo.ErrorAddModele= true  
        state.AddModeleInfo.messageAddModele=action.payload 
})

/////////////////////////////////
.addCase(updateOffre.pending,(state)=>{
    state.updateOffreInfo.Loadingupdate=true
})
    .addCase(updateOffre.fulfilled,(state,action)=>{
    state.updateOffreInfo.Loadingupdate=false
    state.updateOffreInfo.Successupdate= true 

})
    .addCase(updateOffre.rejected,(state,action)=>{
        state.updateOffreInfo.Loadingupdate=false
        state.updateOffreInfo.Errorupdate= true  
        state.updateOffreInfo.messageupdate=action.payload   
})
///////////////////////////////
.addCase(deleteOffre.pending,(state)=>{
    state.deleteOffreInfo.Loadingdelete=true
})
    .addCase(deleteOffre.fulfilled,(state,action)=>{
    state.deleteOffreInfo.Loadingdelete=false
    state.deleteOffreInfo.Successdelete= true 

})
    .addCase(deleteOffre.rejected,(state,action)=>{
        state.deleteOffreInfo.Loadingdelete=false
        state.deleteOffreInfo.Errordelete= true  
        state.deleteOffreInfo.messagedelete=action.payload   
})
/////////////////////////
.addCase(addOffre.pending,(state)=>{
    state.AddOffreInfo.LoadingAddOffre=true
})
    .addCase(addOffre.fulfilled,(state,action)=>{
    state.AddOffreInfo.LoadingAddOffre=false
    state.AddOffreInfo.SuccessAddOffre= true       
})
    .addCase(addOffre.rejected,(state,action)=>{
        state.AddOffreInfo.LoadingAddOffre=false
        state.AddOffreInfo.ErrorAddOffre= true  
        state.AddOffreInfo.messageAddOffre=action.payload 
})




}
})


export const {reset1,reset2,reset3,reset4,reset5}=carSlice.actions
export default carSlice.reducer