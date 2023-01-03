
import React,{useContext, useEffect} from 'react'
import {  useNavigate,Link,useParams } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { getAllDemandeReceive ,updateDemande} from '../features/demande/demandeSlice'
import { getallMarque,getallModele} from '../features/car/carSlice'
import Spinner from '../components/Spinner'
import context1 from '../context1'



const DemandeRecusAProp = () => {
  const dispatch=useDispatch()
    const {isEn}=useContext(context1);
  const demande=useSelector(state=>state.demande)
  const {AllDemandeReceive,SuccessgetAllDemandeReceive,LoadinggetAllDemandeReceive,ErrorgetAllDemandeReceive,messagegetAllDemandeReceive}=demande.getAllDemandeReceiveInfo


  const user=useSelector(state=>state.user)
  const {userLogin}=user

  
  const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
  const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)

  useEffect(()=>{
dispatch(getAllDemandeReceive(userLogin.userId))
dispatch(getallMarque())
dispatch(getallModele())
    
   },[dispatch,userLogin.userId])

   const confirmerHndler=(dem)=>{
alert("Vous etes sur de confirmer cette demande ?")
        dispatch(updateDemande({
        id:dem.id,
        locataireId:dem.locataireId,
        voitureId:dem.voitureId,
        dateDebut:dem.dateDebut,
        dateFin:dem.dateFin,
        prixTotal:dem.prixTotal,
        statut:"Accepter"
        }))
        window.location.reload(true)
   }
  
   const rejectHandler=(dem)=>{
    alert("Vous etes sur de rejeter cette demande ?")
    dispatch(updateDemande({
        id:dem.id,
        locataireId:dem.locataireId,
        voitureId:dem.voitureId,
        dateDebut:dem.dateDebut,
        dateFin:dem.dateFin,
        prixTotal:dem.prixTotal,
        statut:"Rejeter"
        }))
        window.location.reload(true)
   }


  return (
    <div> 
           <Link to='/' className='btn btn-light my-3'>{isEn ? "Return":'Revenir'}</Link>
        {AllDemandeReceive.length === 0 ? <h1>{isEn ? "No Received Demands":"Vous N'avez Recus Aucune Demandes"}</h1> : (
            <>
  <h1 className='addLine mb-5 mt-3'>{isEn ? "Your Demands":'Votre Demandes'}</h1>
  {/*Errordelete && <Message variant='danger'>{messagedelete}</Message>*/}
  {LoadinggetAllDemandeReceive ? <Spinner/> : ErrorgetAllDemandeReceive ? <Message variant='danger'>{messagegetAllDemandeReceive}</Message> : (
      <Table striped bordered="true" hover responsive className='table-sm'>
          <thead>
              <tr>
              <th>{isEn ? "Brand":'MARQUE'} </th>
                  <th>{isEn ? "Modele":'MODELE'} </th>
                  <th>{isEn ? "Start Date":'Date De Debut'} </th>
                  <th>{isEn ? "End Date":'Date De Fin'} </th>
                  <th>{isEn ? "Total Price":'Prix Total'} </th>
                  <th>{isEn ? "Status":'Statut'} </th>
                  <th>{isEn ? "Car Rental":'Locataire'} </th>
                  <th>{isEn ? "Car Rental Email":'Email de Locataire'} </th>
               
                  <th></th>
                  <th></th>
             
              </tr>
          </thead>
          <tbody>
              {AllDemandeReceive.map((dem)=>(
                  <tr key={dem.voitureId}>
                       <td>{marques.length && marques.find(({marqueId})=>marqueId===dem.voiture.marqueId).nomMarque}</td>
                      <td>{models.length && models.find(({modeleId})=>modeleId===dem.voiture.modeleId).nomModel}</td>
                     <td>{dem.dateDebut.substring(0,10)}</td>
                     <td>{dem.dateFin.substring(0,10)}</td>
                      <td>{dem.prixTotal}</td>
                      <td>{dem.statut}</td>
                      <td>{dem.locataire.nom}</td>
                      <td>
                         {dem.locataire.email}
                      </td>
                      <td>
                      <Button variant='success'  className='btn-sm mx-2 mt-1' onClick={()=>confirmerHndler(dem)}>
                          <i class="fa-solid fa-check"></i>
                          </Button>
                      </td>
                      <td>
                      <Button variant='danger'  className='btn-sm mx-2 mt-1' onClick={()=>rejectHandler(dem)}>
                        <i class="fa-solid fa-xmark"></i>
                          </Button>
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

export default DemandeRecusAProp

