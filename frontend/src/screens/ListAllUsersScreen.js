import React,{useContext, useEffect, useState} from 'react'
import {  useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getAllUsers,getAllUsersRole,addRole,removeRole,getUsersByRolesBlackList,getUsersByRolesProp} from '../features/user/userSlice.js'
import context1 from '../context1'

const ListAllUsersScreen = () => {

    const dispatch=useDispatch()
    const {isEn}=useContext(context1)

    const user=useSelector(state=>state.user)
    const {isLoadingAllUsers,isErrorAllUsers,messageAllUsers,AllUsers}=user.AllUsersInfo
    const {userLogin}=user

    const {isLoadingAllUsersRole,isErrorAllUsersRole,messageAllUsersRole,AllUsersRole}=user.AllUsersRoleInfo

    const {isLoadingAllUserBlackListed,isErrorAllUserBlackListed,messageAllUserBlackListed,AllUserBlackListed}=user.AllUserBlackListedInfo

    const {AllUserProp}=user.AllUserPropInfo
    //all Users except the  admin
    let allUsersNonthis=AllUsers.filter((u)=>u.id!==userLogin.userId)
    

    const navigate=useNavigate()
    useEffect(()=>{ 
        if(userLogin && userLogin.roles &&  userLogin.roles.includes("Admin")){
       
        dispatch(getAllUsers())
        dispatch(getAllUsersRole("Admin"))
        dispatch(getUsersByRolesBlackList())
        dispatch(getUsersByRolesProp())
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
        <h1>{isEn ? "Users":'Utilisateurs'}</h1> 
        {isLoadingAllUsers ? <Loader/> : isErrorAllUsers ? <Message variant='danger'>{messageAllUsers}</Message> : (
            <Table striped bordered="true" hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>{isEn ? "First Name":'Prenom'} </th>
                        <th>{isEn ? "Last Name":'Nom'} </th>
                        <th>{isEn ? "email":'Email'} </th>
                        <th>{isEn ? "admin":'Admin'} </th>
                        <th>{isEn ? "Owner":'Proprietaire'} </th>
                        <th>{isEn ? "Blacklisted":'Blacklisted'} </th>
                        <th>{isEn ? "Add Role":'Ajouter role '}</th>
                        <th>{isEn ? "Remove Role":'Supprimer role'}</th>
                        <th></th>
                  
                    </tr>
                </thead>
                <tbody>
                    {allUsersNonthis.map((user)=>(
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
                                {AllUserProp && AllUserProp.filter(u=>u.id===user.id) ? (<i className='fas fa-check' style={{color:'green'}}></i>) :(
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}
                            </td>
                            <td>
                            {  AllUserBlackListed && AllUserBlackListed.filter(u=>u.id===user.id).length ? (<i className='fas fa-check' style={{color:'green'}}></i>) :(
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}
                            </td>
                            <td>
                                <Button variant='primary'  className='btn-sm mx-2 mt-1' onClick={()=>AddroleHandler(user.id,"Admin")}>
                                {isEn ? "Admin":"Admin"}
                                </Button>
                                <Button variant='primary'  className='btn-sm mx-2 mt-1' onClick={()=>AddroleHandler(user.id,"Proprietaire")}>
                                {isEn ? "Owner":'Prop'}
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
                                {isEn ? "Owner":'Prop'}
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