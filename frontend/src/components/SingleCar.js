import React,{useContext, useEffect,useState} from 'react'
import {  Button, Card } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import Rating from './Rating'
import { getallMarque,getallModele } from '../features/car/carSlice'
import { getAllUsers ,addFavorite,getFavoriteUser,deleteFavorite} from '../features/user/userSlice'
import {useDispatch,useSelector} from 'react-redux'
import context1 from '../context1'

const SingleCar = ({car,allcarReviews}) => {

    const {isEn}=useContext(context1);
    const dispatch=useDispatch()
const navigate=useNavigate()

    let listreviewOfCar=allcarReviews.length ? allcarReviews.filter(r=>r.voitureId===car.voitureId) :[]
    let valuerev=listreviewOfCar.reduce((acc,item)=>item.rating+acc,0)/listreviewOfCar.length

    
    const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
    const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)

    const user=useSelector(state=>state.user)
    const {isLoadingAllUsers,isErrorAllUsers,messageAllUsers,AllUsers}=user.AllUsersInfo
    const {userLogin}=user

    const {isLoadingAllUserFavorite,isSuccessAllUserFavorite,isErrorAllUserFavorite,messageAllUserFavorite,AllUserFavorite}=user.AllUserFavoriteInfo
    
    const [isFavori,setIsFavori]=useState(AllUserFavorite.some((c)=>c.voitureId===car.voitureId))

   
  
    useEffect(()=>{
        dispatch(getallMarque())
        dispatch(getallModele())
        dispatch(getAllUsers())

        if(userLogin && userLogin.userId)
        dispatch(getFavoriteUser(userLogin.userId))
    },[dispatch,car.marqueId,car.modeleId,userLogin && userLogin.userId,car.voitureId])
   
    let path
    if(car.imagePath.length>50)
     path=car.imagePath.substring(53,car.imagePath.length);
     else path=car.imagePath

     const handleClick=(car)=>{
        if(!userLogin || !userLogin.userId){
            alert("SVP abonnez vous ")
            navigate('/users/abonnez')
        }
        else{
        
            setIsFavori(!isFavori)
        if(!isFavori)
        dispatch(addFavorite({
            userId:userLogin.userId,
            voitureId:car.voitureId
        }))
      
        else 
            dispatch(deleteFavorite({
                userId:userLogin.userId,
                voitureId:car.voitureId
            }))
         
    }
     }

   
    return (
        <Card className='my-3 p-3 rounded'>
        <Link to={`/Voiture/${car.voitureId}`} className='image'>
            <Card.Img src={path} variant='top' width='263.98' height='175.88'/>
        </Link>
        <Card.Body>
            <div className='flexMe'>
        <Link to={`/Voiture/${car.voitureId}`} style={{color:"#2c3e50"}}>
           <Card.Title as='div' ><strong>{marques.length && marques.find(({marqueId})=>marqueId===car.marqueId).nomMarque}  
          {" "}  {models.length && models.find(({modeleId})=>modeleId===car.modeleId).nomModel}</strong></Card.Title>
        </Link>
        <Button className='help' onClick={()=>handleClick(car)}>
            <>{isFavori? 
            <h5><i className="fa-solid fa-bookmark"></i></h5>  :
        <h5><i className="fa-regular fa-bookmark"></i></h5>
        }</>
        </Button >
        </div>
        <Card.Text as='h6' className='description' style={{color:"#2c3e50"}}>
           {car.description}
        </Card.Text>
         <Card.Text as='div'>
           <Rating value={valuerev} text={'  '+listreviewOfCar.length +" Reviews"}    />
        </Card.Text>
        <Card.Text as='div' style={{color:"#2c3e50"}}>
            {car.prixParJour} {isEn ? "DH/per day":"DH/par jours"} 
        </Card.Text>
        <Card.Text as='div' style={{color:"black"}}>
        {isEn ? "Owner ":"Proprietaire "}{AllUsers.length && AllUsers.find(({id})=>id===car.proprietaireId).userName}
        </Card.Text>
   
        </Card.Body>
    </Card>
    )
  }
  
  export default SingleCar
  