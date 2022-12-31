import React,{useEffect,useState} from 'react'
import {  Card } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import Rating from './Rating'
import { getallMarque,getallModele  } from '../features/car/carSlice'
import { getAllUsers } from '../features/user/userSlice'
import {useDispatch,useSelector} from 'react-redux'

const SingleCar = ({car}) => {

    const dispatch=useDispatch()

    
    const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
    const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)

    const user=useSelector(state=>state.user)
    const {isLoadingAllUsers,isErrorAllUsers,messageAllUsers,AllUsers}=user.AllUsersInfo
    
    useEffect(()=>{
        dispatch(getallMarque())
        dispatch(getallModele())
        dispatch(getAllUsers())
    },[dispatch,car.marqueId,car.modeleId])
   
    let path
    if(car.imagePath.length>50)
     path=car.imagePath.substring(53,car.imagePath.length);
     else path=car.imagePath
 
   
    return (
        <Card className='my-3 p-3 rounded'>
        <Link to={`/Voiture/${car.voitureId}`} className='image'>
            <Card.Img src={path} variant='top' width='263.98' height='175.88'/>
        </Link>
        <Card.Body>
        <Link to={`/Voiture/${car.voitureId}`} style={{color:"#2c3e50"}}>
           <Card.Title as='div' ><strong>{marques.length && marques.find(({marqueId})=>marqueId===car.marqueId).nomMarque}  
          {" "}  {models.length && models.find(({modeleId})=>modeleId===car.modeleId).nomModel}</strong></Card.Title>
        </Link>
        <Card.Text as='h6' className='description' style={{color:"#2c3e50"}}>
           {car.description}
        </Card.Text>
         <Card.Text as='div'>
           <Rating value={car.rating} text={' '+car.numReviews +''}    />
        </Card.Text>
        <Card.Text as='div' style={{color:"#2c3e50"}}>
            {car.prixParJour} DH/par jour
        </Card.Text>
        <Card.Text as='div' style={{color:"black"}}>
            Proprietaire: {AllUsers.length && AllUsers.find(({id})=>id===car.proprietaireId).userName}
        </Card.Text>
        </Card.Body>
    </Card>
    )
  }
  
  export default SingleCar
  