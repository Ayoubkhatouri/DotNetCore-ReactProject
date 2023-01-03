import React,{useState,useEffect, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom"
import FormContainer from '../components/FormContainer'
import {Form ,Button, Row ,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addCar,reset1,getallMarque,getallModele } from '../features/car/carSlice'
import axios from 'axios'
import Spinner from '../components/Spinner'
import Loader from '../components/Loader'
import context1 from '../context1'



const AjouterVoitureScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const {isEn} =useContext(context1);

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
    <Link to='/' className='btn btn-light my-3'>{isEn ? "Return":"Revenir"}</Link>
    <FormContainer>
         
        <h1 className='addLine'>{isEn ? "Add Car":"Ajouter une Voiture"}</h1>
        {ErrorAdd && <Message variant='danger'>{messageAdd}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='prix'>
                <Form.Label>{isEn ? "Price per day ":"Prix de la Voiture par jour"}</Form.Label>
                <Form.Control type='text' placeholder={isEn ? "Enter Price":'Entrer Un Prix'} value={PrixParJour}
                onChange={(e)=>setPrixParJour(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='annee' className='mt-3'>
                <Form.Label>{isEn ? "Year":"Année"} </Form.Label>
                <Form.Control type='text' placeholder={isEn ? "Enter Year":"Entrer Année"} value={Annee}
                onChange={(e)=>setAnnee(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='kilometrage' className='mt-3'>
                <Form.Label>{isEn ? "Mileage":"Kilometrage"} </Form.Label>
                <Form.Control  type='kilometrage'  placeholder={isEn ? "Mileage":'Kilometrage'} value={kilometrage}
                onChange={(e)=>setKilometrage(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='marqueId' className='mt-3' >
            <Form.Select onChange={(e)=>setMarqueId(marques.find(({nomMarque})=>nomMarque===e.target.value).marqueId)} >
            <option>{isEn ? "Chose Brand":'Choisir une Marque'} </option>
                {marques.map((marque)=>(
                     <option  key={marque.marqueId} >{marque.nomMarque}</option>
                ))}               
                    </Form.Select>
            </Form.Group>
            <Form.Group controlId='modeleId' className='mt-3' >
            <Form.Select onChange={(e)=>setModeleId(models.find(({nomModel})=>nomModel===e.target.value).modeleId)}>
                    <option> {isEn ? "Chose Model":'Choisir un Modele'} </option>
                    {models.map((model)=>(
                     <option key={model.modeleId} >{model.nomModel}</option>
                ))}   
                    </Form.Select>
            </Form.Group>
            <Form.Group controlId='couleur' className='mt-3' >
                <Form.Label>{isEn ? "Color":'Coleur'}   </Form.Label>
                <Form.Control  type='couleur'placeholder={isEn ? "Color":'Couleur'}  value={Couleur}
                onChange={(e)=>setCouleur(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='immatriculation' className='mt-3' >
                <Form.Label>{isEn ? "Registration":'Immatriculation'}  </Form.Label>
                <Form.Control  type='immatriculation'placeholder={isEn ? "Registration":'Immatriculation'}  value={Immatriculation}
                onChange={(e)=>setImmatriculation(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='description' className='mt-3'>
                <Form.Label>{isEn ? "Description":'Description'}  </Form.Label>
                <Form.Control as='textarea' type='text' rows={4} placeholder={isEn ? "Description":'Description'}  value={Description}
                onChange={(e)=>setDescription(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='image' className='mt-3'>
                <Form.Label>Image </Form.Label>
                <Form.Control type='text' placeholder={isEn ? "Enter Image":'Entrer Image'}  value={imagePath}
                onChange={(e)=>setImagePath("C:\\Users\\admin\\OneDrive\\Desktop\\image\\"+e.target.value.substring(12,e.target.value.length))}> 
                </Form.Control>
                <Form.Control  type='File' label={isEn ? "Chose File":'Choisir fichier'}   onChange={(e)=>setImagePath("C:\\Users\\admin\\OneDrive\\Desktop\\image\\"+e.target.value.substring(12,e.target.value.length))}></Form.Control>
                     {uploading && <Loader/>}
            </Form.Group>       
    
            <Button type='submit' variant='primary' className='mt-3'>{isEn ? "Add":'Ajouter'} </Button>
        </Form>
    </FormContainer>
    </>
  )
}

export default AjouterVoitureScreen
