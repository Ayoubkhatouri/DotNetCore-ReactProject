import React,{useEffect, useState} from 'react'
import {  useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getAllUsers,getAllUsersRole,addRole,removeRole} from '../features/user/userSlice.js'

const ListAllUsersScreen = () => {

    const dispatch=useDispatch()
    

    const user=useSelector(state=>state.user)
    const {isLoadingAllUsers,isErrorAllUsers,messageAllUsers,AllUsers}=user.AllUsersInfo
    const {userLogin}=user

    const {isLoadingAllUsersRole,isErrorAllUsersRole,messageAllUsersRole,AllUsersRole}=user.AllUsersRoleInfo
    

    const navigate=useNavigate()
    useEffect(()=>{ 
        if(userLogin && userLogin.roles &&  userLogin.roles.includes("Admin")){
       
        dispatch(getAllUsers())
        dispatch(getAllUsersRole("Admin"))
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate,userLogin])

    const deleteHndler=(id)=>{
        if(window.confirm("Vous etes sur ?")){
       // dispatch(deleteUser(id))
        window.location.reload(true);
    }
}
const AddroleHandler=(id,role)=>{
    if(window.confirm("Vous etes sur d'ajouter a cet utilisatuer "+ role +" ?"))
    dispatch(addRole({userId:id,role}))
    window.location.reload(true);
}

const RemoveroleHandler=(id,role)=>{
    if(window.confirm("Vous etes sur de supprimer "+ role +"a cet utilisateur ?"))
    dispatch(removeRole({userId:id,role}))
    window.location.reload(true);
}


  return (
    <>
        <h1>Users</h1> 
        {isLoadingAllUsers ? <Loader/> : isErrorAllUsers ? <Message variant='danger'>{messageAllUsers}</Message> : (
            <Table striped bordered="true" hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>PRENOM</th>
                        <th>NOM</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th>AGENCE</th>
                        <th>AJOUTER ROLE</th>
                        <th>SUPPRIMER ROLE</th>
                        <th></th>
                  
                    </tr>
                </thead>
                <tbody>
                    {AllUsers.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.prenom}</td>
                            <td>{user.nom}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                {AllUsersRole && AllUsersRole.filter(u=>u.id===user.id).length ? (<i className='fas fa-check' style={{color:'green'}}></i>) :(
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}
                            </td>
                            <td>
                                {user.isAgence ? (<i className='fas fa-check' style={{color:'green'}}></i>) :(
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}
                            </td>
                            <td>
                                <Button variant='primary'  className='btn-sm mx-2 mt-1' onClick={()=>AddroleHandler(user.id,"Admin")}>
                                Admin
                                </Button>
                                <Button variant='primary'  className='btn-sm mx-2 mt-1' onClick={()=>AddroleHandler(user.id,"Proprietaire")}>
                                Prop
                                </Button>
                              
                                <Button variant='dark'  className='btn-sm mx-2 mt-1' onClick={()=>AddroleHandler(user.id,"BlackListed")}>
                                <i className='fa-solid fa-user-xmark'  style={{color:'black'}}></i>
                                </Button>
                                </td>
                                <td>
                                <Button variant='danger'  className='btn-sm mx-2 mt-1' onClick={()=>RemoveroleHandler(user.id,"Admin")}>
                                Admin
                                </Button>
                                <Button variant='danger'  className='btn-sm mx-2 mt-1' onClick={()=>RemoveroleHandler(user.id,"Proprietaire")}>
                                Prop
                                </Button>
                              
                                <Button variant='success'  className='btn-sm mx-2 mt-1' onClick={()=>RemoveroleHandler(user.id,"BlackListed")}>
                                <i className='fa-solid fa-user-xmark'  style={{color:'green'}}></i>
                                </Button>
                                </td>   
                            <td >
                                <LinkContainer to={`/admin/users/modifier/${user.id}`}>
                                <Button variant='success' className='btn-sm mx-2 mt-1'>
                                        <i className='fas fa-edit' style={{color:'green'}}></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger'  className='btn-sm mx-2 mt-1' onClick={()=>deleteHndler(user.id)}>
                                <i className='fas fa-trash'  style={{color:'red'}}></i>
                                </Button>
                                </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default ListAllUsersScreen