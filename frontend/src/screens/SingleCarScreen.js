import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { getAllUsers, addFavorite,getFavoriteUser,deleteFavorite  } from '../features/user/userSlice'
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap'
import DonutChart from '../components/DonutChart'
import SingleCar from '../components/SingleCar'
import {reset4,allOffresSpecial,isOffreSpecial, listSingleCar, getallMarque, getallModele,allCarsOfUser} from '../features/car/carSlice'
import { addDemande } from '../features/demande/demandeSlice'


const SingleCarScreen = () => {

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const [ajouterDemande,setAjouterDemande]=useState(false)
  const [dateDebut,setDateDebut]=useState('')
  const [dateFin,setDateFin]=useState('')
  const [prixTotal,setPrixTotal]=useState('')

  const { singleCarError, singleCarLoading, singleCarSucces, singleCarMessageError, singleCar } = useSelector(state => state.car.singleCarInfo)


  const allCarsOfUserOfUserInfo = useSelector(state => state.car.allCarsOfUserOfUserInfo)
  const { allCarsOfUserLoading, allCarsOfUserSucces, allCarsOfUserError, allCarsOfUserMessageError, CarsOfUser } = allCarsOfUserOfUserInfo


  const { marqueError, marqueSucces, marqueLoding, marqueMessageError, marques } = useSelector(state => state.car.allmarqueInfo)
  const { modelLoding, modelError, modelMessageError, modelSucces, models } = useSelector(state => state.car.allmodelInfo)

  const user = useSelector(state => state.user)
  const { isLoadingAllUsers, isErrorAllUsers, messageAllUsers, AllUsers } = user.AllUsersInfo
  const {userLogin}=user
  
  const allOffresSpecialInfo=useSelector(state=>state.car.allOffresSpecialInfo)
  const {allCarsOffreSpecialLoading,allCarsOffreSpecialSucces,allCarsOffreSpecialError,allCarsOffreSpecialMessageError,allCarsOffreSpecial}=allOffresSpecialInfo

   
  const isOffreSpecialInfo=useSelector(state=>state.car.isOffreSpecialInfo)
  const {isOffreSpecialLoading,isOffreSpecialSucces,isOffreSpecialError,isOffreSpecialMessageError,isOffreSpecialdata}=isOffreSpecialInfo
  
  const {isLoadingAllUserFavorite,isSuccessAllUserFavorite,isErrorAllUserFavorite,messageAllUserFavorite,AllUserFavorite}=user.AllUserFavoriteInfo
  
  

 let CarsOfUserExceptTheClicked=CarsOfUser.filter(c=>c.voitureId !=params.id)

 const [isFavori,setIsFavori]=useState(AllUserFavorite.some((c)=>c.voitureId===singleCar.voitureId))
 

  let mycar
  if(isOffreSpecialdata){
    mycar=allCarsOffreSpecial.filter(({voiture})=>voiture.voitureId===singleCar.voitureId)
  }

  useEffect(() => {

    dispatch(listSingleCar(params.id))
    dispatch(allCarsOfUser(singleCar.proprietaireId))
    dispatch(getallMarque())
    dispatch(getallModele())
    dispatch(getAllUsers())
    dispatch(allOffresSpecial())
    dispatch(isOffreSpecial(singleCar.voitureId))
    if(userLogin && userLogin.userId)
        dispatch(getFavoriteUser(userLogin.userId))
  
  }, [params.id, dispatch,singleCar.proprietaireId,singleCar.voitureId,userLogin && userLogin.userId])



  //just to detect when we press the back button in the page
  function detectePressBack() {
    navigate('/')
    window.location.reload()
  }
  window.addEventListener("popstate", detectePressBack)


  let path
  if(singleCar.imagePath && singleCar.imagePath.length>50)
   path=singleCar.imagePath.substring(53,singleCar.imagePath.length);
   else path=singleCar.imagePath


   const HandleAddCommande=({singleCar,dateDebut,dateFin,prixTotal})=>{
  dispatch( addDemande({
  locataireId:userLogin.userId,
  voitureId:singleCar.voitureId,
  dateDebut,
  dateFin,
  prixTotal,
  statut:"en attente"
}))
alert("Votre demande est envoyé avec succes")

   }

   const handleClick=(car)=>{
    if(!userLogin || !userLogin.userId){
        alert("SVP abonnez vous ")
        navigate('/users/abonnez')
    }
    else{
    
        setIsFavori(!isFavori)
    if(!isFavori)
    dispatch(addFavorite({
        userId:userLogin.userId,
        voitureId:car.voitureId
    }))
  
    else 
        dispatch(deleteFavorite({
            userId:userLogin.userId,
            voitureId:car.voitureId
        }))
     
}
 }

  if (singleCarLoading)
    return <Loader />


  return (
    <>
      {singleCarError ? <Message variant="danger">{singleCarMessageError}</Message> : (
        <> 
        <div className='myDivSearch addLine mt-3'>
           <h1 >{marques && marques.length &&  singleCar.marqueId && marques.find(({ marqueId }) => marqueId === singleCar.marqueId).nomMarque}
            {" "}  {models && models.length  && singleCar.modeleId && models.find(({ modeleId }) => modeleId === singleCar.modeleId).nomModel}</h1>
            <div style={{fontSize:'30px'}}>
            <Rating value={singleCar.rating} />
            </div>
        </div>
          <Row>
            <Col sm={12} md={9} lg={8} xl={8} className='mt-3' >
              <ListGroup variant='flush'>
                <ListGroup.Item >
                  <Image src={path} fluid />
                </ListGroup.Item>
                <ListGroup.Item>
                <h4 style={{ whiteSpace:'pre-line'}}>
                {singleCar.description}
            </h4>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col className='mt-3'  sm={12} md={3} lg={4} xl={4}>
      <h3 className='addLine'>Informations</h3>
      <Button className='help' onClick={()=>handleClick(singleCar)}>
            <>{isFavori? 
            <h5><i className="fa-solid fa-bookmark"></i></h5>  :
        <h5><i className="fa-regular fa-bookmark"></i></h5>
        }</>
        </Button >
      <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h5 ><strong>Proprietaire:  </strong> { AllUsers.length && singleCar.proprietaireId  && AllUsers.find(({id})=>id===singleCar.proprietaireId).nom } { AllUsers.length && singleCar.proprietaireId && AllUsers.find(({id})=>id===singleCar.proprietaireId).prenom }</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <h5><strong>Couleur:  </strong>{ singleCar.couleur}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <h5><strong>Annee:  </strong>{ singleCar.annee}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <h5><strong>Kilometrage:  </strong>{ singleCar.kilometrage}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <h5><strong>Immatriculation:  </strong>{ singleCar.immatriculation}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <h5><strong>Etat:  </strong>{ singleCar.estDisponible ? "Disponible":"N'est pas disponible"}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          {isOffreSpecialdata ?
                          
                          <h5><strong>Prix Par Jour:  </strong ><span style={{textDecorationLine:'line-through'}}>{ singleCar.prixParJour}DH</span> 
                          {"  "}{ mycar.length && mycar[0].montant} DH
                          </h5>
                          :
                             <h5><strong>Prix Par Jour:  </strong >{ singleCar.prixParJour} DH</h5>
                          }
                       
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Button  className='btn btn-success mt-3' onClick={()=>setAjouterDemande(!ajouterDemande)}>Demander</Button>
                        </ListGroup.Item>
                        {ajouterDemande &&<>
                        <ListGroup.Item>
                        <Form.Control className='mt-2'  placeholder='Date de Debut' value={dateDebut}
                          onChange={(e)=>setDateDebut(e.target.value)}> 
                          </Form.Control>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Form.Control className='mt-2'  placeholder='Date de Fin' value={dateFin}
                          onChange={(e)=>setDateFin(e.target.value)}> 
                          </Form.Control>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Form.Control className='mt-2'  placeholder='Prix total' value={prixTotal}
                          onChange={(e)=>setPrixTotal(e.target.value)}> 
                          </Form.Control>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Button  variant='primary' className='mt-3' onClick={()=>HandleAddCommande({singleCar,dateDebut,dateFin,prixTotal})}>Confirmer</Button>
                        </ListGroup.Item>
                        </>}
                    </ListGroup>
                    <h3 className='addLine mt-3'>Statistiques de { AllUsers.length && singleCar.proprietaireId && AllUsers.find(({id})=>id===singleCar.proprietaireId).nom }</h3>
      <DonutChart v={CarsOfUser.length} u={0} c={0}/>
      </Col>
          </Row>
          <Row> 
       { CarsOfUserExceptTheClicked.map((car)=>(
           <Col  key={car.voitureId} sm={12} md={6} lg={4} xl={3}>
           <SingleCar car={car}/>
           </Col>
       ))}
   </Row>
        </>
      )}


    </>
  )
}

export default SingleCarScreen
