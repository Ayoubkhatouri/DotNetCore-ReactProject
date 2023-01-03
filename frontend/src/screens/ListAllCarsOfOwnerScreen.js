import React,{useContext, useEffect} from 'react'
import {  useNavigate,Link,useParams } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { allCarsOfUser,getallMarque,getallModele,allOffresSpecial ,deleteCar} from '../features/car/carSlice'
import Spinner from '../components/Spinner'
import context1 from '../context1'


const ListAllCarsOfOwnerScreen = () => {

  
const params=useParams()
    const dispatch=useDispatch()
    const user=useSelector(state=>state.user)
    const {userLogin}=user
    const {isEn}=useContext(context1);
     
  const allOffresSpecialInfo=useSelector(state=>state.car.allOffresSpecialInfo)
  const {allCarsOffreSpecialLoading,allCarsOffreSpecialSucces,allCarsOffreSpecialError,allCarsOffreSpecialMessageError,allCarsOffreSpecial}=allOffresSpecialInfo

    
  const allCarsOfUserOfUserInfo = useSelector(state => state.car.allCarsOfUserOfUserInfo)
  const { allCarsOfUserLoading, allCarsOfUserSucces, allCarsOfUserError, allCarsOfUserMessageError, CarsOfUser } = allCarsOfUserOfUserInfo


  const {marqueError,marqueSucces,marqueLoding,marqueMessageError,marques}=useSelector(state=>state.car.allmarqueInfo)
  const {modelLoding,modelError,modelMessageError,modelSucces,models}=useSelector(state=>state.car.allmodelInfo)

  function IsOfferSpecial(voitur){
    return allCarsOffreSpecial.filter(({voiture})=>voiture.voitureId===voitur.voitureId)

  }
    
    const navigate=useNavigate()
    useEffect(()=>{ 
       
        if(userLogin){
        dispatch(allCarsOfUser(userLogin.userId))
        dispatch(getallMarque())
        dispatch(getallModele())
        dispatch(allOffresSpecial())
        }

        else{
            navigate('/users/abonnez"')
        }
    },[dispatch,navigate,userLogin])

    
    const deleteHndler=(id)=>{
        if(window.confirm('Vous voulez supprimer cette voiture ?')){
       dispatch(deleteCar(id))
       window.location.reload(true);
    }
    }


  return (
    <div> 
           <Link to='/' className='btn btn-light my-3'>{isEn ? "Return":'Revenir'}</Link>
        {CarsOfUser.length === 0 ? <h1>{isEn ? "You have no Cars":"Vous N'avez Pas de Voitures"}Vous N'avez Pas De Voitures</h1> : (
            <>
  <h1 className='addLine mb-5 mt-3'>{isEn ? "Your Cars":'Vos Voitures'}</h1>
  {/*Errordelete && <Message variant='danger'>{messagedelete}</Message>*/}
  {allCarsOfUserLoading ? <Spinner/> : allCarsOfUserError ? <Message variant='danger'>{allCarsOfUserMessageError}</Message> : (
      <Table striped bordered="true" hover responsive className='table-sm'>
          <thead>
              <tr>
                  <th>{isEn ? "Brand":'MARQUE'} </th>
                  <th>{isEn ? "Model":'MODELE'} </th>
                  <th>{isEn ? "Registration":'Immatriculation'} </th>
                  <th>{isEn ? "Mileage":'Kilometrage'} </th>
                  <th>{isEn ? "Price per day":'Prix par jour'}</th>
                  <th>{isEn ? "Color":'Couleur'}</th>
                  <th>{isEn ? "Year":'Année'}</th>
                  <th>{isEn ? "Available":'Disponible'}</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              {CarsOfUser.map((car)=>(
                  <tr key={car.voitureId}>
                       <td>{marques.length && marques.find(({marqueId})=>marqueId===car.marqueId).nomMarque}</td>
                      <td>{models.length && models.find(({modeleId})=>modeleId===car.modeleId).nomModel}</td>
                     <td>{car.immatriculation}</td>
                     <td>{car.kilometrage}</td>
                      <td>
                      {IsOfferSpecial(car).length ?
                          
                          <h5><span style={{textDecorationLine:'line-through'}}>{ car.prixParJour}DH</span> 
                          {"  "}{ IsOfferSpecial(car).length && IsOfferSpecial(car)[0].montant} DH
                          </h5>
                          :
                             <h5>{ car.prixParJour} DH</h5>
                          }
                        </td>
                      <td>{car.couleur}</td>
                      <td>{car.annee}</td>
                      <td>
                          {car.estDisponible ?   <i className='fas fa-check' style={{color:'green'}}></i>:(
                              <i className='fas fa-times' style={{color:'red'}}></i>
                          )}
                      </td>
                      
                      <td >
                          <LinkContainer to={`/voiture/modifier/${car.voitureId}`}>
                          <Button variant='primary' className='btn-sm mx-2 mt-1'>
                                  <i className='fas fa-edit' style={{color:'green'}}></i>
                              </Button>
                          </LinkContainer>
                          <Button variant='danger'  className='btn-sm mx-2 mt-1' onClick={()=>deleteHndler(car.voitureId)}>
                          <i className='fas fa-trash'  style={{color:'red'}}></i>
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

export default ListAllCarsOfOwnerScreen