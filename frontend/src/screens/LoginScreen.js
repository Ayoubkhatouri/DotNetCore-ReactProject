import React,{useState,useEffect, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom"
import FormContainer from '../components/FormContainer'
import {Form ,Button, Row ,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/user/userSlice'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import context1 from '../context1'


const LoginScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {isError,isSuccess,isLoading,message,userLogin}=useSelector(state=>state.user)

    useEffect(()=>{
        if(isSuccess || userLogin){
          if(userLogin && userLogin.roles.includes("BlackListed")){
            localStorage.removeItem('userLogin')
            alert("Votre compte est desactivez pour le momoment")
            navigate('/')
            window.location.reload()
          }
        else
          navigate('/')
        }
       
       
    },[dispatch,isSuccess,userLogin,navigate])
  
   



    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login({email,password}))
    }

    const {isEn} = useContext(context1)
    if(isLoading)
    return <Spinner/>

  return (
    <FormContainer>
    <h1 className='addLine mb-5 mt-3'>{isEn ? "Login":'Se Connecter'}</h1>
    {isError && <Message variant='danger'>{message}</Message>}

    <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label> Email</Form.Label>
            <Form.Control type='email' placeholder={isEn ? "Enter email":'Entrer email'} value={email}
            onChange={(e)=>setEmail(e.target.value)}> 
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='mt-3'>
            <Form.Label>{isEn ? "Password":'Mot De Passe'}</Form.Label>
            <Form.Control type='password' placeholder={isEn ? "Enter Password":'Entrer Mot de passe'} value={password}
            onChange={(e)=>setPassword(e.target.value)}> 
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-3'>{isEn ? "Login":'Se Connecter'}</Button>
    </Form>
    <Row className='py-3'>
      <Col>
      {isEn ? "Register":'Créer un compte ?'}<Link to='/users/register'> {isEn ? "Login":'Se Connecter'}</Link>
      </Col>
    </Row>
</FormContainer>
  )
}

export default LoginScreen
