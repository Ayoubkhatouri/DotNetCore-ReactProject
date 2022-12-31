import React,{useState,useEffect} from 'react'
import {Form ,Button, Row ,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link, useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner'
import {register} from '../features/user/userSlice'




const RegisterScreen = () => {
    const [nom,setNom]=useState('')
    const [prenom,setPrenom]=useState('')
    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [telephone,setTele]=useState('')
    const [ville,setVille]=useState('')
    const [adresse,setAdresse]=useState('')
    const [isAgence,setisAgence]=useState(false)
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [Message2,setMessage2]=useState(null)

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const {isLoading,isError,isSuccess,message,userLogin}=user

    useEffect(()=>{
        if(isSuccess || userLogin){ // means is logged in 
          navigate('/')
      }   
  
      },[navigate,userLogin,isSuccess,dispatch])


      const submitHandler=(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
           setMessage2('Passwords do not match')
        }
        else{
           dispatch(register({nom,prenom,userName,telephone,ville,adresse,email,password,isAgence})) 
        }
       
       }


    if(isLoading) 
    return <Spinner/>
     

  return (
    <FormContainer>
        <h1 className='addLine mb-5 mt-3' >Identifiez Vous</h1>
        {Message2 && <Message variant='danger'>{Message2}</Message>}
        {isError && <Message variant='danger'>{message}</Message>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Nom </Form.Label>
                <Form.Control type='name' placeholder='Entrer Votre Nom' value={nom}
                onChange={(e)=>setNom(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='prenom' className='mt-3'>
                <Form.Label>Prenom </Form.Label>
                <Form.Control type='name' placeholder='Entrer Votre Prenom' value={prenom}
                onChange={(e)=>setPrenom(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='userName' className='mt-3'>
                <Form.Label>Nom d'utilisateur </Form.Label>
                <Form.Control type='name' placeholder='Entrer Votre Nom utilisateur' value={userName}
                onChange={(e)=>setUserName(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='mt-3'>
                <Form.Label>Adresse Email</Form.Label>
                <Form.Control type='email' placeholder='Enter Votre Email' value={email}
                onChange={(e)=>setEmail(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='tele' className='mt-3'>
                <Form.Label>Telephone</Form.Label>
                <Form.Control type='tel' placeholder='Enter Votre Numero de telephone' value={telephone}
                onChange={(e)=>setTele(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='ville' className='mt-3'>
                <Form.Label>Ville</Form.Label>
                <Form.Control  placeholder='Enter Votre Ville' value={ville}
                onChange={(e)=>setVille(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='adresse' className='mt-3'>
                <Form.Label>Adresse</Form.Label>
                <Form.Control  placeholder='Enter Votre Adresse' value={adresse}
                onChange={(e)=>setAdresse(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='isAgence' className='mt-3'>
                <Form.Check type='switch'  label="Agence" value={isAgence}
                onChange={(e)=>setisAgence(!isAgence)}> 
                </Form.Check>
            </Form.Group>
            <Form.Group controlId='password' className='mt-3'>
                <Form.Label>Mot De Passe </Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password}
                onChange={(e)=>setPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='mt-3'>
                <Form.Label>Confirmez Mot De Passe </Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>S'identifiez</Button>
        </Form>
        <Row className='py-3'>
          <Col>
          Vous avez déja un compte ?<Link to='/users/abonnez'>S'abonnez</Link>
          </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen
