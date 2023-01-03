import React,{useEffect,useContext, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import {reset4, listAllCars,reset2,allOffresSpecial,getallMarque,getallModele ,getAllReview} from '../features/car/carSlice'
import SingleCar from '../components/SingleCar'
import {Row,Col} from 'react-bootstrap'
import Spinner from '../components/Spinner'
import Loader from '../components/Loader'
import { getAllUsers } from '../features/user/userSlice'
import CarsCarousel from '../components/CarsCarousel'
import Message from '../components/Message'
import DonutChart from '../components/DonutChart'
import {Form,Button} from 'react-bootstrap'
import { getAllDemande } from '../features/demande/demandeSlice'
import context1 from '../context1'



const HomeScreen = () => {
  const {isEn,setIsEn}=useContext(context1)
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
  
  const allReviewCarInfo=useSelector(state=>state.car.allReviewCarInfo)
  const {allReviewCar,allReviewCarSucces,allReviewCarLoading,allReviewCarError,allReviewCarMessageError}=allReviewCarInfo

const demande=useSelector(state=>state.demande)
  const {AllDemande}=demande.getAllDemandeInfo

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
dispatch(getAllReview())
  dispatch(getAllDemande())
  
 },[dispatch,allCarsSucces])


 if(allCarsLoading)
 return <Spinner/>

 return (
   <> 
     <Row className='mt-3' >
        <Col  sm={12} md={12} lg={7} xl={7} >
        <h1 className='addLine mb-4 mt-3'>{isEn ? "Special Offers" :"Offres Specials"}</h1>
      <CarsCarousel  />
      </Col>    
      <Col  className='todayNews'  sm={12} md={12} lg={5} xl={5}>
      <h1 className='addLine mb-4 mt-3'>{isEn ? "Statistics":"Statistiques"}</h1>
      <DonutChart v={allCars.length} u={AllUsers.length} c={AllDemande.length} mybool={true}/>
      </Col>
    </Row>
    <div className='myDivSearch addLine  mb-4 mt-5'>
    <h1 className='hh' >{isEn ? "Our Cars":"Nos Voitures"}</h1>
    <div className='myInputSearch'>
    <Form   style={{height:'40px'}} className='bottomMe'>
        <Form.Control type='text' name='q'  onChange={(e)=>setKeyword(e.target.value)}
        placeholder={isEn ? "Search By Brand":"Chercher Par Marque"} ></Form.Control>
    </Form>
    <Form   style={{height:'40px'}} className='bottomMe aa'> 
        <Form.Control type='text' name='q'  onChange={(e)=>setKeywordModel(e.target.value)}
        placeholder={isEn ? "Search By Model":"Chercher Par Model"} ></Form.Control>
    </Form>
    </div>
    </div>
   {allCarsError ?   <Message variant='danger'>{allCarsMessageError}</Message> :
   <>
    <Row> 
      
       {carsBySearch.map((car)=>(
           <Col  key={car.voitureId} sm={12} md={6} lg={4} xl={3}>
           <SingleCar car={car} allcarReviews={allReviewCar} />
           </Col>
       ))}
   </Row>
 
   </>
 
   }
   </>
  )
}

export default HomeScreen
