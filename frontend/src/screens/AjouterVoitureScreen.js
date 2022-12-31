import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import FormContainer from '../components/FormContainer'
import {Form ,Button, Row ,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addCar,reset1,getallMarque,getallModele } from '../features/car/carSlice'
import axios from 'axios'
import Spinner from '../components/Spinner'
import Loader from '../components/Loader'



const AjouterVoitureScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [PrixParJour,setPrixParJour]=useState(0)
    const [Annee,setAnnee]=useState('')
    const [kilometrage,setKilometrage]=useState('')
    const [MarqueId,setMarqueId]=useState(0)
    const [ModeleId,setModeleId]=useState(0)
    const [Couleur,setCouleur]=useState('')
    const [Immatriculation,setImmatriculation]=useState('')
    const [Description,setDescription]=useState('')
    const [imagePath,setImagePath]=useState('')
    const [uploading,setUploading]=useState(false)

    
    


    const {isError,isSuccess,isLoading,message,userLogin}=useSelector(state=>state.user)
    const {LoadingAdd,ErrorAdd,messageAdd,SuccessAdd}=useSelector(state=>state.car.AddCarInfo)

    const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
    const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)


    useEffect(()=>{
        dispatch(getallMarque())
        dispatch(getallModele())
        if(SuccessAdd){
        navigate('/')
        dispatch(reset1())
    }
       },[SuccessAdd,navigate,dispatch])



       const submitHandler=(e)=>{
        e.preventDefault()
       dispatch(addCar({
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
    
    if(LoadingAdd)
    return <Spinner/>



  return (
    <>
    <Link to='/' className='btn btn-light my-3'>Revenir</Link>
    <FormContainer>
         
        <h1 className='addLine'>Ajouter une Voitures</h1>
        {ErrorAdd && <Message variant='danger'>{messageAdd}</Message>}
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

export default AjouterVoitureScreen
