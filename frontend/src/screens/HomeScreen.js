import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import {reset4, listAllCars,reset2,allOffresSpecial } from '../features/car/carSlice'
import SingleCar from '../components/SingleCar'
import {Row,Col} from 'react-bootstrap'
import Spinner from '../components/Spinner'
import Loader from '../components/Loader'
import { getAllUsers } from '../features/user/userSlice'
import CarsCarousel from '../components/CarsCarousel'
import Message from '../components/Message'
import DonutChart from '../components/DonutChart'
import { Link } from 'react-router-dom'



const HomeScreen = () => {

  const dispatch=useDispatch()
  
  const allCarsInfo=useSelector(state=>state.car.allCarsInfo)
  const {allCarsLoading,allCarsSucces,allCarsError,allCarsMessageError,allCars}=allCarsInfo

  const user=useSelector(state=>state.user)
  const {isLoadingAllUsers,isErrorAllUsers,messageAllUsers,AllUsers}=user.AllUsersInfo

 useEffect(()=>{
  dispatch(reset4())
   dispatch(listAllCars()) 
   dispatch(getAllUsers())

 },[dispatch,allCarsSucces])

console.log(allCars)

 if(allCarsLoading)
 return <Spinner/>

 return (
   <> 
     <Row className='mt-3' >
        <Col  sm={12} md={9} lg={8} xl={8} >
        <h1 className='addLine mb-4 mt-3'>Offres Special</h1>
      <CarsCarousel  />
      </Col>    
      <Col Col className='todayNews'  sm={12} md={3} lg={4} xl={4}>
      <h1 className='addLine mb-4 mt-3'>Statistiques</h1>
      <DonutChart v={allCars.length} u={AllUsers.length} c={6} mybool={true}/>
      </Col>
    </Row>
    
    <h1 className='addLine mb-4 mt-5'>Nos Voiture</h1>
   {allCarsError ?   <Message variant='danger'>{allCarsMessageError}</Message> :
   <>
    <Row> 
      
       { allCars.map((car)=>(
           <Col  key={car.voitureId} sm={12} md={6} lg={4} xl={3}>
           <SingleCar car={car}/>
           </Col>
       ))}
   </Row>
 
   </>
 
   }
   </>
  )
}

export default HomeScreen
