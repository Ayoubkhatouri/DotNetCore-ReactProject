import React,{useContext, useEffect} from 'react'
import {  useNavigate,Link,useParams } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { getAllDemandeMadeByUser } from '../features/demande/demandeSlice'
import { getallMarque,getallModele} from '../features/car/carSlice'
import Spinner from '../components/Spinner'
import context1 from '../context1';


const DemandeMadeByUserScreen = () => {
  const dispatch=useDispatch()

  const demande=useSelector(state=>state.demande)
  const {AllDemandeMadeByUser,LoadinggetAllDemandeMadeByUser,ErrorgetAllDemandeMadeByUser,messagegetAllDemandeMadeByUser}=demande.getAllDemandeMadeByUserInfo

  const user=useSelector(state=>state.user)
  const {userLogin}=user

  
  const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
  const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)

  const {isEn} = useContext(context1);
  useEffect(()=>{
dispatch(getAllDemandeMadeByUser(userLogin.userId))
dispatch(getallMarque())
dispatch(getallModele())
    
   },[dispatch,userLogin.userId])
  
  return (
    <div> 
           <Link to='/' className='btn btn-light my-3'>{isEn ? "Return":'Revenir'} </Link>
        {AllDemandeMadeByUser.length === 0 ? <h1>{isEn ? "No Demands Sent":"Vous n'avez pas envoyé aucune demande"}  </h1> : (
            <>
  <h1 className='addLine mb-5 mt-3'>{isEn ? "Your Demands":"Votre Demandes Envoyé"} </h1>
  {/*Errordelete && <Message variant='danger'>{messagedelete}</Message>*/}
  {LoadinggetAllDemandeMadeByUser ? <Spinner/> : ErrorgetAllDemandeMadeByUser ? <Message variant='danger'>{messagegetAllDemandeMadeByUser}</Message> : (
      <Table striped bordered="true" hover responsive className='table-sm'>
          <thead>
              <tr>
                  <th>{isEn ? "Brand":'MARQUE'} </th>
                  <th>{isEn ? "Modele":'MODELE'} </th>
                  <th>{isEn ? "Start Date":'Date De Debut'} </th>
                  <th>{isEn ? "End Date":'Date De Fin'} </th>
                  <th>{isEn ? "Total Price":'Prix Total'} </th>
                  <th>{isEn ? "Status":'Statut'} </th>
                  <th>{isEn ? "Owner":'Proprietaire'} </th>
                  <th>{isEn ? "Owner Email":'Email Proprietaire'} </th>
             
              </tr>
          </thead>
          <tbody>
              {AllDemandeMadeByUser.map((dem)=>(
                  <tr key={dem.voitureId}>
                       <td>{marques.length && marques.find(({marqueId})=>marqueId===dem.voiture.marqueId).nomMarque}</td>
                      <td>{models.length && models.find(({modeleId})=>modeleId===dem.voiture.modeleId).nomModel}</td>
                     <td>{dem.dateDebut.substring(0,10)}</td>
                     <td>{dem.dateFin.substring(0,10)}</td>
                      <td>{dem.prixTotal}</td>
                      <td>{dem.statut}</td>
                      <td>{dem.voiture.proprietaire.nom}</td>
                      <td>
                         {dem.voiture.proprietaire.email}
                      </td>
             
                  </tr>
              ))}
          </tbody>
      </Table>
  )}
      </>  )} 
      
    </div>
  
  )
}

export default DemandeMadeByUserScreen
