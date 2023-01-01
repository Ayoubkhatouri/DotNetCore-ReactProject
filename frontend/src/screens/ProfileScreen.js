import React,{useState,useEffect} from 'react'
import {  useNavigate } from "react-router-dom"
import {Form ,Button, Row ,Col, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { getUserDetails,updateUser } from '../features/user/userSlice'



 const ProfileScreen = () => {
   
    const dispatch=useDispatch()


    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const {userLogin}=user
    //const {isLoadingUpdate,isErrorUpdate,isSuccessUpdate,messageUpdate}=user.userUpdateInfo

    const {LoadingUserDetails,ErrorUserDetails,userDetails}=user.UserDetailsInfo
    const {isLoadingUpdate,isErrorUpdate,isSuccessUpdate,messageUpdate}=user.userUpdateInfo

    const [nom,setName]=useState(userDetails.nom)
    const [prenom,setPrenom]=useState(userDetails.prenom)
    const [telephone,setTelephone]=useState(userDetails.phoneNumber)
    const [ville,setVille]=useState(userDetails.ville)
    const [adresse,setAdresse]=useState(userDetails.adresse)
    const [isAgence,setIsAgence]=useState(userDetails.isAgence)
    
    

 

    useEffect(()=>{
        if(! userLogin){ // means is not logged in 
            navigate('/users/abonnez')
        }   
        dispatch(getUserDetails(userLogin.userId))
        setName(userDetails.nom)
        setPrenom(userDetails.prenom)
        setTelephone(userDetails.phoneNumber)
        setVille(userDetails.ville)
        setAdresse(userDetails.adresse)
        setIsAgence(userDetails.isAgence)
    
    },[dispatch,userLogin,userLogin.userId,navigate,userDetails.ville,userDetails.phoneNumber,userDetails.isAgence,userDetails.adresse,userDetails.nom,userDetails.prenom])

const submitHandler=(e)=>{
    e.preventDefault()
    let id=userDetails.id
 dispatch(updateUser({id,nom,prenom,telephone,ville,adresse,isAgence}))
 window.location.reload()

 }

  if(isLoadingUpdate)
  return <Spinner/>

  return <Row>
    <Col >
    <h2  className='addLine mb-5 mt-3 '>{userLogin.userName} Profile </h2>
    {isErrorUpdate && <Message variant='danger'>{messageUpdate}</Message>}
    {isSuccessUpdate && <Message variant='success'>{messageUpdate}</Message>}
        {false && <Message variant='danger'>{"messageUpdate"}</Message>}
        {false && <Message variant='success'>{"messageUpdate"}</Message>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='nom'>
                <Form.Label>Nom </Form.Label>
                <Form.Control type='nom' placeholder='Entrer le Nom' value={nom}
                onChange={(e)=>setName(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='prenom'>
                <Form.Label>Prenom </Form.Label>
                <Form.Control type='nom' placeholder='Entrer le Prenom' value={prenom}
                onChange={(e)=>setPrenom(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='tete' className='mt-3'>
                <Form.Label>Telephone</Form.Label>
                <Form.Control type='tele' placeholder='Numero de Telephone' value={telephone}
                onChange={(e)=>setTelephone(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='ville' className='mt-3'>
                <Form.Label>Ville</Form.Label>
                <Form.Control type='text' placeholder='Ville' value={ville}
                onChange={(e)=>setVille(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='adresse' className='mt-3'>
                <Form.Label>Adresse</Form.Label>
                <Form.Control type='text' placeholder='Adresse' value={adresse}
                onChange={(e)=>setAdresse(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='isAgence' className='mt-3'>
                <Form.Check type='switch'  label="Agence" value={isAgence} checked={isAgence}
                onChange={(e)=>setIsAgence(e.target.checked)}> 
                </Form.Check>
            </Form.Group>
           
            <Button type='submit' variant='primary' className='mt-3'>Modifié</Button>
        </Form>
    </Col>
    
  </Row>
}

export default ProfileScreen
