import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import {reset4, listAllCars,reset2,allOffresSpecial,getallMarque,getallModele } from '../features/car/carSlice'
import SingleCar from '../components/SingleCar'
import {Row,Col} from 'react-bootstrap'
import Spinner from '../components/Spinner'
import Loader from '../components/Loader'
import { getAllUsers } from '../features/user/userSlice'
import CarsCarousel from '../components/CarsCarousel'
import Message from '../components/Message'
import DonutChart from '../components/DonutChart'
import {Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'



const HomeScreen = () => {

  const dispatch=useDispatch()
  const [keyword,setKeyword]=useState('')
  const [keywordModel,setKeywordModel]=useState('')
 
  
  const allCarsInfo=useSelector(state=>state.car.allCarsInfo)
  const {allCarsLoading,allCarsSucces,allCarsError,allCarsMessageError,allCars}=allCarsInfo

  const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
  const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)

  const user=useSelector(state=>state.user)
  const {userLogin}=user
  const {isLoadingAllUsers,isErrorAllUsers,messageAllUsers,AllUsers}=user.AllUsersInfo

  //get only cars that belong to other 
  let carsOfOthers=[]
  if(userLogin && userLogin.userId){
    carsOfOthers=allCars.filter((c)=>c.proprietaireId !== userLogin.userId)
  }else
  carsOfOthers=allCars

    let carsBySearchMarque=[]
    let carsBySearchModel=[]
    let carsBySearch=[]
    
    if(keyword.length){
     let regex=new RegExp(keyword,'i')
    for(let i=0;i<carsOfOthers.length;i++){
    for(let j=0;j<marques.length;j++) {
        if((carsOfOthers.length && carsOfOthers[i].marqueId===marques[j].marqueId && marques[j].nomMarque.match(regex)) )
        carsBySearchMarque.push(carsOfOthers[i])
    }
    }
  }
  else
  carsBySearchMarque=carsOfOthers

  if(keywordModel.length){
    let regex2=new RegExp(keywordModel,'i')
   for(let i=0;i<carsOfOthers.length;i++){
   for(let j=0;j<models.length;j++) {
       if((carsOfOthers.length && carsOfOthers[i].modeleId===models[j].modeleId && models[j].nomModel.match(regex2)) )
       carsBySearchModel.push(carsOfOthers[i])
   }
   }
 }
 else
 carsBySearchModel=carsOfOthers


 //lets merge the two
 carsBySearch=carsBySearchMarque.filter(c=>carsBySearchModel.includes(c))

 useEffect(()=>{
  dispatch(reset4())
   dispatch(listAllCars()) 
   dispatch(getAllUsers())
   dispatch(getallMarque())
   dispatch(getallModele())

  
 },[dispatch,allCarsSucces])




 if(allCarsLoading)
 return <Spinner/>

 return (
   <> 
     <Row className='mt-3' >
        <Col  sm={12} md={9} lg={8} xl={8} >
        <h1 className='addLine mb-4 mt-3'>Offres Special</h1>
      <CarsCarousel  />
      </Col>    
      <Col  className='todayNews'  sm={12} md={3} lg={4} xl={4}>
      <h1 className='addLine mb-4 mt-3'>Statistiques</h1>
      <DonutChart v={allCars.length} u={AllUsers.length} c={6} mybool={true}/>
      </Col>
    </Row>
    <div className='myDivSearch  mb-4 mt-5'>
    <h1 className='addLine hh' >Nos Voiture</h1>
    <div className='myInputSearch'>
    <Form   style={{height:'40px'}}>
        <Form.Control type='text' name='q'  onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Chercher Par Marque' ></Form.Control>
    </Form>
    <Form   style={{height:'40px'}}>
        <Form.Control type='text' name='q'  onChange={(e)=>setKeywordModel(e.target.value)}
        placeholder='Chercher Par Modele' ></Form.Control>
    </Form>
    </div>
    </div>
   {allCarsError ?   <Message variant='danger'>{allCarsMessageError}</Message> :
   <>
    <Row> 
      
       {carsBySearch.map((car)=>(
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
