import React,{useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listAllCars ,reset2} from '../features/car/carSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allOffresSpecial } from '../features/car/carSlice'



const CarsCarousel = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    
  const allOffresSpecialInfo=useSelector(state=>state.car.allOffresSpecialInfo)
  const {allCarsOffreSpecialLoading,allCarsOffreSpecialSucces,allCarsOffreSpecialError,allCarsOffreSpecialMessageError,allCarsOffreSpecial}=allOffresSpecialInfo

  const user=useSelector(state=>state.user)
  const {userLogin}=user

  // //get only cars that belong to other 
  let carsOfOthers=[]
  if(userLogin && userLogin.userId){
    carsOfOthers=allCarsOffreSpecial.filter((c)=>c.voiture.proprietaireId !== userLogin.userId)
  }else
  carsOfOthers=allCarsOffreSpecial
   
  useEffect(()=>{

    dispatch(allOffresSpecial())
 
  },[dispatch])
 

    const handleClick=(id)=>{
        navigate(`/Voiture/${id}`)
        window.location.reload()
      }
    
     let path2
     function reglerPath(path){
        if(path.length>50)
        path2=path.substring(53,path.length);
        else path2=path
        return path2
     }
       
  return <>
  {allCarsOffreSpecialLoading? <Loader/> : allCarsOffreSpecialError ? <Message variant='danger'>{allCarsOffreSpecialMessageError}</Message> :(
    <Carousel fade pause='hover' className='myCarousel bg-dark'>
        {carsOfOthers.map((car)=>(
            <Carousel.Item key={car.voiture.voitureId}>
                <Link onClick={()=>handleClick(car.voiture.voitureId)} to={`/Voiture/${car.voiture.voitureId}`}>
                    <Image className='imageCarousel' src={reglerPath(car.voiture.imagePath)}  fluid/>
                    <Carousel.Caption className='carousel-caption'>
                      
                        <div className='specialOff'>
                        <h4 style={{color:'yellow',fontSize:'20px',textDecorationLine:'line-through'}}>Prix initial:{car.voiture.prixParJour}</h4>
                        <h4 style={{color:'white',fontSize:'27px'}}>Prix special:{car.montant}</h4>
                        </div>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
        }
  </>
  
}
export default CarsCarousel