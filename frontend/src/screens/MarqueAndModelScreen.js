import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getallMarque,getallModele,addMarque,addModele } from '../features/car/carSlice'
import Spinner from '../components/Spinner'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap'

const MarqueAndModelScreen = () => {
  
    const [newMarque,setNewMarque]=useState('')
    const [MarqueId,setMarqueId]=useState(0)
    const [newModel,setNewModel]=useState('')
    const dispatch=useDispatch()


    const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
    const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)

    const {LoadingAddMarque,ErrorAddMarque,messageAddMarque,SuccessAddMarque}=useSelector(state=>state.car.AddMarqueInfo)
    
    const {LoadingAddModele,ErrorAddModele,messageAddModele,SuccessAddModele}=useSelector(state=>state.car.AddModeleInfo)

    useEffect(()=>{
        dispatch(getallMarque())
        dispatch(getallModele())
  
        
        if(SuccessAddMarque)
        alert("La Marque est ajouter")

        if(SuccessAddModele)
        alert("Le Modele est ajouter")
     
       },[dispatch,SuccessAddMarque,SuccessAddModele])

       if(marqueLoding || modelLoding) 
       return <Spinner/>


       const HandleAddMarque=(m)=>{
        dispatch(addMarque({nomMarque:m}))
       }
       const HandleAddModel=(marqId,newMod)=>{
        console.log({marqueId:marqId,nomModel:newMod})
            dispatch(addModele({marqueId:marqId,nomModel:newMod}))
       }
       

       

  return (
    <Row className='mt-3' >
    <Col  sm={12} md={6} lg={6} xl={6} >
        <h1 className='addLine mb-4 mt-3'>Marques</h1>
        <ListGroup variant='flush'>
        {marques.map((marque)=>(
                     <ListGroup.Item key={marque.marqueId}>
                    <h5> {marque.nomMarque}</h5>
                      </ListGroup.Item>
                ))}  
                <ListGroup.Item>
                <Form.Group controlId='adresse' className='mt-3'>
                <Form.Control  placeholder='Nouvelle Marque' value={newMarque}
                onChange={(e)=>setNewMarque(e.target.value)}> 
                </Form.Control>
                <Button  variant='primary' className='mt-3' onClick={()=>HandleAddMarque(newMarque)}>Ajouter</Button>
                </Form.Group>
                </ListGroup.Item>
                        </ListGroup>
                       
      </Col> 
      <Col  className='todayNews'  sm={12} md={6} lg={6} xl={6}>
        <h1 className='addLine mb-4 mt-3'>Models</h1>
        <ListGroup variant='flush'>
        {models.map((model)=>(
                     <ListGroup.Item key={model.modeleId}> 
                    <h5> {model.nomModel}</h5>
                      </ListGroup.Item>
                ))}  
                <ListGroup.Item>
                <Form.Control  placeholder='Nouvelle Marque' value={newModel}
                onChange={(e)=>setNewModel(e.target.value)}> 
                </Form.Control>
                <Form.Select onChange={(e)=>setMarqueId(e.target.value!=="Choisir une Marque" ? marques.find(({nomMarque})=>nomMarque===e.target.value).marqueId : 0)} >
            <option>Choisir une Marque</option>
                {marques.map((marque)=>(
                     <option  key={marque.marqueId} >{marque.nomMarque}</option>
                ))}               
                    </Form.Select>
                    <Button  variant='primary' className='mt-3'  disabled={(MarqueId===0 ||  !newModel.length)? true :false }
                    onClick={()=>HandleAddModel(MarqueId,newModel)}>Ajouter</Button>
                </ListGroup.Item>
                        </ListGroup>
      </Col> 
      </Row>
  )
}

export default MarqueAndModelScreen
