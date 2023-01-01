import React,{useState,useEffect} from 'react'
import { Link, useNavigate,useParams } from "react-router-dom"
import FormContainer from '../components/FormContainer'
import {Form ,Button, Row ,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import Loader from '../components/Loader'
import { getallMarque,getallModele,reset5,updateCar,listSingleCar } from '../features/car/carSlice'



const UpdateCarScreen = () => {
    
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const params=useParams()
  const carId=params.id

  const {isError,isSuccess,isLoading,message,userLogin}=useSelector(state=>state.user)


  const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
  const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)

  const{NewCar,LoadingupdateCar,ErrorupdateCar,messageupdateCar,SuccessupdateCar}=useSelector(state=>state.car.updateCarInfo)

      
  const { singleCarError, singleCarLoading, singleCarSucces, singleCarMessageError, singleCar } = useSelector(state => state.car.singleCarInfo)

  const [PrixParJour,setPrixParJour]=useState(singleCar.prixParJour)
  const [Annee,setAnnee]=useState(singleCar.annee)
  const [kilometrage,setKilometrage]=useState(singleCar.kilometrage)
  const [MarqueId,setMarqueId]=useState(singleCar.marqueId)
  const [ModeleId,setModeleId]=useState(singleCar.modeleId)
  const [Couleur,setCouleur]=useState(singleCar.couleur)
  const [Immatriculation,setImmatriculation]=useState(singleCar.immatriculation)
  const [Description,setDescription]=useState(singleCar.description)
  const [imagePath,setImagePath]=useState(singleCar.imagePath)
  const [uploading,setUploading]=useState(false)
    useEffect(()=>{
        dispatch(getallMarque())
        dispatch(getallModele())
        dispatch(listSingleCar(carId))
        setPrixParJour(singleCar.prixParJour)
        setAnnee(singleCar.annee)
        setKilometrage(singleCar.kilometrage)
        setMarqueId(singleCar.marqueId)
        setModeleId(singleCar.modeleId)
        setCouleur(singleCar.couleur)
        setImmatriculation(singleCar.immatriculation)
        setDescription(singleCar.description)
        setImagePath(singleCar.imagePath)
        
        if(SuccessupdateCar){
        navigate('/')
        dispatch(reset5())
    }
       },[SuccessupdateCar,navigate,dispatch,carId,singleCar.prixParJour,singleCar.annee,singleCar.imagePath,singleCar.immatriculation,singleCar.couleur,singleCar.description,singleCar.marqueId,singleCar.modeleId,singleCar.kilometrage])


const submitHandler=(e)=>{
    e.preventDefault()
   dispatch(updateCar({
    id:parseInt(carId),
    PrixParJour,
    Annee,
    kilometrage,
    MarqueId,
    ModeleId,
    Couleur,
    Rating:0,
    Immatriculation,
    Description,
    imagePath,
    ProprietaireId:userLogin.userId,
    EstDisponible:true,
}))
   }

   if(singleCarLoading)
   return <Spinner/>

  return (
    <>
    <Link to='/' className='btn btn-light my-3'>Revenir</Link>
    <FormContainer>
         
        <h1 className='addLine'>Ajouter une Voitures</h1>
        {ErrorupdateCar && <Message variant='danger'>{messageupdateCar}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='prix'>
                <Form.Label>Prix de la Voiture par jour</Form.Label>
                <Form.Control type='text' placeholder='Entrer Un Prix' value={PrixParJour}
                onChange={(e)=>setPrixParJour(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='annee' className='mt-3'>
                <Form.Label>Annee </Form.Label>
                <Form.Control type='text' placeholder='Entrer Annee' value={Annee}
                onChange={(e)=>setAnnee(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='kilometrage' className='mt-3'>
                <Form.Label>Kilometrage </Form.Label>
                <Form.Control  type='kilometrage'  placeholder='Kilometrage' value={kilometrage}
                onChange={(e)=>setKilometrage(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='marqueId' className='mt-3' >
            <Form.Select onChange={(e)=>setMarqueId(marques.find(({nomMarque})=>nomMarque===e.target.value).marqueId)} >
            <option>Choisir une Marque</option>
                {marques.map((marque)=>(
                     <option  key={marque.marqueId} >{marque.nomMarque}</option>
                ))}               
                    </Form.Select>
            </Form.Group>
            <Form.Group controlId='modeleId' className='mt-3' >
            <Form.Select onChange={(e)=>setModeleId(models.find(({nomModel})=>nomModel===e.target.value).modeleId)}>
                    <option>Choisir un Modele</option>
                    {models.map((model)=>(
                     <option key={model.modeleId} >{model.nomModel}</option>
                ))}   
                    </Form.Select>
            </Form.Group>
            <Form.Group controlId='couleur' className='mt-3' >
                <Form.Label>Color  </Form.Label>
                <Form.Control  type='couleur'placeholder='couleur' value={Couleur}
                onChange={(e)=>setCouleur(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='immatriculation' className='mt-3' >
                <Form.Label>Immatriculation </Form.Label>
                <Form.Control  type='immatriculation'placeholder='immatriculation' value={Immatriculation}
                onChange={(e)=>setImmatriculation(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='description' className='mt-3'>
                <Form.Label>Description </Form.Label>
                <Form.Control as='textarea' type='text' rows={4} placeholder='Description' value={Description}
                onChange={(e)=>setDescription(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='image' className='mt-3'>
                <Form.Label>Image </Form.Label>
                <Form.Control type='text' placeholder='Entrer Une Image' value={imagePath}
                onChange={(e)=>setImagePath("C:\\Users\\admin\\OneDrive\\Desktop\\image\\"+e.target.value.substring(12,e.target.value.length))}> 
                </Form.Control>
                <Form.Control  type='File' label='Choose File'  onChange={(e)=>setImagePath("C:\\Users\\admin\\OneDrive\\Desktop\\image\\"+e.target.value.substring(12,e.target.value.length))}></Form.Control>
                     {uploading && <Loader/>}
            </Form.Group>           
            <Button type='submit' variant='primary' className='mt-3'>Ajouter</Button>
        </Form>
    </FormContainer>
    </>
  )
}

export default UpdateCarScreen
