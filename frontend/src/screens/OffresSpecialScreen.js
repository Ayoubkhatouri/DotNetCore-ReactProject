import React,{useEffect, useState} from 'react'
import {  useNavigate,Link,useParams } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button,Form} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Spinner from '../components/Spinner'
import {allCarsOfUser, allOffresSpecial,getallMarque,getallModele,updateOffre,deleteOffre,addOffre } from '../features/car/carSlice'



const OffresSpecialScreen = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [modefier,setModefier]=useState(false)
    const [prixOffre,setPrixOffre]=useState()
    const [ajouterOffre,setAjouterOffre]=useState(false)
    const [newPrixOffre,setNewPrixOffre]=useState()
    const [idVoiture,setIdVoiture]=useState()
    const [idVoitureEdit,setIdVoitureEdit]=useState()

    const allOffresSpecialInfo=useSelector(state=>state.car.allOffresSpecialInfo)
    const {allCarsOffreSpecialLoading,allCarsOffreSpecialSucces,allCarsOffreSpecialError,allCarsOffreSpecialMessageError,allCarsOffreSpecial}=allOffresSpecialInfo

    const {isError,isSuccess,isLoading,message,userLogin}=useSelector(state=>state.user)

    let allCarsOffreSpecialByOwner=allCarsOffreSpecial.filter(({voiture})=>voiture.proprietaireId===userLogin.userId)

    const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
    const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)
  
     
  const allCarsOfUserOfUserInfo = useSelector(state => state.car.allCarsOfUserOfUserInfo)
  const { allCarsOfUserLoading, allCarsOfUserSucces, allCarsOfUserError, allCarsOfUserMessageError, CarsOfUser } = allCarsOfUserOfUserInfo

  let carsNoOffreSpecial=[]
 
  let k=0
  if(allCarsOffreSpecialByOwner.length){
  for(let i=0;i<CarsOfUser.length;i++){
    k=0
    for(let j=0;j<allCarsOffreSpecialByOwner.length;j++){
        if((CarsOfUser[i].voitureId !== allCarsOffreSpecialByOwner[j].voiture.voitureId)){
            k++
        }
        if(k===allCarsOffreSpecialByOwner.length)
        carsNoOffreSpecial.push(CarsOfUser[i])
    }
  }
}
  else  carsNoOffreSpecial=CarsOfUser


    useEffect(()=>{
        dispatch(getallMarque())
        dispatch(getallModele())
        dispatch(allOffresSpecial())
        dispatch(allCarsOfUser(userLogin.userId))
     
      },[dispatch,userLogin.userId])
      
      const deleteHndler=(id)=>{
        if(window.confirm('Vous voulez supprimer cette Offre ?')){
            dispatch(deleteOffre(id))
        }
        window.location.reload(true)
      }

      const HandleAddEditOffre=({idVoitureEdit,prixOffre})=>{
        if(window.confirm("Vous etes sur de modifier cette offre ?"))
       dispatch(updateOffre({
        voitureId:idVoitureEdit,
        montant:prixOffre 
       }))
       window.location.reload(true)
      }

      const HandleAddOffre=({idVoiture,newPrixOffre})=>{
        if(window.confirm("Vous etes sur d'ajouter l'Offre ?"))
        dispatch(addOffre({
         voitureId:idVoiture,
         montant:newPrixOffre 
        }))
        window.location.reload(true)
      }


      if(allCarsOffreSpecialLoading) 
      return <Loader/>

  return (
    <div> 
    <Link to='/' className='btn btn-light my-3'>Revenir</Link>
 {allCarsOffreSpecialByOwner.length === 0 ? <h1 className='addLine mb-5 mt-3'>Vous N'avez Pas D'offre Special</h1> : (
     <>
<h1 className='addLine mb-5 mt-3'>Vos Offres Special</h1>
{/*Errordelete && <Message variant='danger'>{messagedelete}</Message>*/}
{allCarsOffreSpecialLoading ? <Spinner/> : allCarsOffreSpecialError ? <Message variant='danger'>{allCarsOffreSpecialMessageError}</Message> : (
<Table striped bordered="true" hover responsive className='table-sm'>
   <thead>
       <tr><td>ID VOITURE</td>
           <th>MARQUE</th>
           <th>MODELE</th>
           <th>IMMATRICULATION</th>
           <th>KILOMETRAGE</th>
           <th>Prix par jour</th>
           <th>Nouveau prix</th>
           <th></th>
           
       </tr>
   </thead>
   <tbody>
       {allCarsOffreSpecialByOwner.length && allCarsOffreSpecialByOwner.map((car)=>(
           <tr key={ car.voiture.voitureId}>
            <td>{car.voiture.voitureId}</td>
                <td>{marques.length && marques.find(({marqueId})=>marqueId===car.voiture.marqueId).nomMarque}</td>
               <td>{models.length && models.find(({modeleId})=>modeleId===car.voiture.modeleId).nomModel}</td>
              <td>{car.voiture.immatriculation}</td>
              <td>{car.voiture.kilometrage}</td>
               <td>{car.voiture.prixParJour}</td>
               <td>{car.montant}</td>

               <td >
                   <Button variant='primary'  className='btn-sm mx-2 mt-1' onClick={()=>deleteHndler(car.voiture.voitureId)}>
                   <i className='fas fa-trash'  style={{color:'red'}}> </i> Offre
                   </Button>
               </td>
              
           </tr>
       ))}
   </tbody>
</Table>
)}
  <Button variant='primary' className='btn-sm mx-2 mt-1'  onClick={()=>setModefier(!modefier)}>
                           <i className='fas fa-edit' style={{color:'green'}}> </i> Modifier
                       </Button>
 {modefier && <>
    <Form.Control className='mt-2'  placeholder='Id Voiture' value={idVoitureEdit}
                onChange={(e)=>setIdVoitureEdit(e.target.value)}> 
                </Form.Control>
                <Form.Control  placeholder='Prix Apres Reduction' value={prixOffre}
                onChange={(e)=>setPrixOffre(e.target.value)}> 
                </Form.Control>
                <Button  variant='primary' className='mt-3' onClick={()=>HandleAddEditOffre({idVoitureEdit,prixOffre})}>Modifier</Button>
                </>}
</>  )} 

{carsNoOffreSpecial.length === 0 ? <h2 className='addLine mb-5 mt-3'>Vous N'avez Pas De Voitures qui ne sont pas offre special</h2> : (
     <>
<h1 className='addLine mb-5 mt-3'>Votre Voitures qui ne sont pas Offre Special</h1>
{/*Errordelete && <Message variant='danger'>{messagedelete}</Message>*/}
{allCarsOfUserLoading ? <Spinner/> : allCarsOfUserError ? <Message variant='danger'>{allCarsOfUserMessageError}</Message> : (
<Table striped bordered="true" hover responsive className='table-sm'>
   <thead>
       <tr>
        <th>ID VOITURE</th>
           <th>MARQUE</th>
           <th>MODELE</th>
           <th>IMMATRICULATION</th>
           <th>KILOMETRAGE</th>
           <th>Prix par jour</th>
           
          
         
       </tr>
   </thead>
   <tbody>
       {carsNoOffreSpecial.length && carsNoOffreSpecial.map((car)=>(
           <tr key={ car.voitureId}>
            <td>{car.voitureId}</td>
                <td>{marques.length && marques.find(({marqueId})=>marqueId===car.marqueId).nomMarque}</td>
               <td>{models.length && models.find(({modeleId})=>modeleId===car.modeleId).nomModel}</td>
              <td>{car.immatriculation}</td>
              <td>{car.kilometrage}</td>
               <td>{car.prixParJour}</td>
             
           </tr>
       ))}
   </tbody>
</Table>

)}

<Button variant='primary' className=' my-3'  onClick={()=>setAjouterOffre(!ajouterOffre)}>
                   <i className="fa-solid fa-plus" style={{color:'green'}}></i>   Offre Special
                       </Button> 
                      
 {ajouterOffre &&  <>   
    <Form.Control className='mt-2'  placeholder='Id Voiture' value={idVoiture}
                onChange={(e)=>setIdVoiture(e.target.value)}> 
                </Form.Control>
                <Form.Control className='mt-2'   placeholder='Prix Apres Reduction' value={newPrixOffre}
                onChange={(e)=>setNewPrixOffre(e.target.value)}> 
                </Form.Control>
                <Button  variant='primary' className='my-2' onClick={()=>HandleAddOffre({idVoiture,newPrixOffre})}>Ajouter</Button>
                </>}
</>  )} 

</div>
  )
}

export default OffresSpecialScreen
