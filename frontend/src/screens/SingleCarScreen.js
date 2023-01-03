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
import { getAllDemandeReceive } from '../features/demande/demandeSlice'
import {addReview,getAllReview, addComment,deleteComment, getAllComments,allOffresSpecial,isOffreSpecial, listSingleCar, getallMarque, getallModele,allCarsOfUser} from '../features/car/carSlice'
import { addDemande } from '../features/demande/demandeSlice'


const SingleCarScreen = () => {


  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const [comment ,setComment]=useState('')
  const [rating,setRating]=useState(0)

  const [ajouterDemande,setAjouterDemande]=useState(false)
  const [dateDebut,setDateDebut]=useState('')
  const [dateFin,setDateFin]=useState('')
  const [prixTotal,setPrixTotal]=useState('')

  const { singleCarError, singleCarLoading, singleCarSucces, singleCarMessageError, singleCar } = useSelector(state => state.car.singleCarInfo)


  const allReviewCarInfo=useSelector(state=>state.car.allReviewCarInfo)
  const {allReviewCar,allReviewCarSucces,allReviewCarLoading,allReviewCarError,allReviewCarMessageError}=allReviewCarInfo
  
  let listreviewOfCar=allReviewCar.length ? allReviewCar.filter(r=>r.voitureId===singleCar.voitureId) :[]
  let valuerev=listreviewOfCar.length ? listreviewOfCar.reduce((acc,item)=>item.rating+acc,0)/listreviewOfCar.length :0
 


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
  
  const allCommentsInfo=useSelector(state=>state.car.allCommentsInfo)
  const {allComments,allCommentsSucces,allCommentsLoading,allCommentsError,allCommentsMessageError}=allCommentsInfo
  
  
  

 let CarsOfUserExceptTheClicked=CarsOfUser.filter(c=>c.voitureId !=params.id)

 const demande=useSelector(state=>state.demande)
  const {AllDemandeReceive}=demande.getAllDemandeReceiveInfo

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
    dispatch(getAllReview())
    dispatch(getAllComments(params.id))
    dispatch(getAllDemandeReceive(singleCar.proprietaireId))
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
            voitureId:car.voitureId,
         
        }))
     
}
 }

 const sumbmitHandler=(e)=>{
  e.preventDefault()
  dispatch(addComment({
    userId:userLogin.userId,
    voitureId:params.id,
    comment,
  }))
 window.location.reload(true)
}

const handlDelete=(comid)=>{
 dispatch( deleteComment(comid))
 window.location.reload(true)

}

const handlAddRev=(e)=>{
  e.preventDefault()
  dispatch(addReview({
    voitureId:params.id,
    userId:userLogin.userId,
    rating:parseInt(rating)
  }))
  window.location.reload(true)
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
            <Rating value={valuerev} text={'  '+listreviewOfCar.length +" Reviews"} />
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
                <ListGroup.Item>
                <Col md={9}>
                    <h4 className='comments'>Commentaires</h4>
                       { ( allComments.length===0) && <Message>Pas de Commentaire</Message>}
                       { (allComments  && allComments.length>0) &&(
                       <ListGroup variant='flush'>
                                {allComments.map((c)=>(
                                    <ListGroup.Item key={c.id}>
                                        <strong style={{fontSize:"19px"}}>{c.nomUser}</strong>
                            
                                        <p >{c.comment} {userLogin && c.userId ===userLogin.userId && 
                                      <Button  className='btn btn-danger flexMe2' onClick={()=>handlDelete(c.id)}>  <i   className="fa-solid fa-trash "></i></Button>
                                        }</p>
                                       
                                    </ListGroup.Item>
                                               
                                ))}
                                    </ListGroup>)
                                }
                                </Col>
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
      <DonutChart v={CarsOfUser.length} u={0} c={AllDemandeReceive.length}/>
      </Col>
          </Row>
          <Row>
               
                                <Col md={4}>
                                <h4 className='comments'>Ajouté Votre Commentaire</h4>
                                 <ListGroup variant='flush'>
                                <ListGroup.Item>
                              
                                    {userLogin ? (
                                    <Form onSubmit={sumbmitHandler}>                                     
                                        <Form.Group controlId='comment'>
                                           
                                            <Form.Control as='textarea' row='3' value={comment}
                                            onChange={(e)=>setComment(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className='mt-3' type='submit' variant='primary'>Ajouter</Button>
                                    </Form>)
                                        :
                                    <Message>SVP <Link to='/users/abonnez'>Abonnez vous</Link> Pour Ajouter Un Commentaire{" "} </Message>}
                                </ListGroup.Item>
                                </ListGroup>
                                
            </Col>
            <Col md={4}>
            <h4 className='comments'>Ajouter Un Rating</h4>
            <ListGroup variant='flush'>
            <ListGroup.Item>
                              
                                   
                                    {userLogin ? (
                                    <Form onSubmit={handlAddRev}>
                                        <Form.Group controlId='rating'>
                                           
                                            <Form.Control as='select' value={rating} 
                                            onChange={(e)=>{setRating(e.target.value)}}>
                                                <option value=''>Selectiné ...</option>
                                                <option value='1'>1 - Médiocre </option>
                                                <option value='2'>2 - Passable </option>
                                                <option value='3'>3 - Bien </option>
                                                <option value='4'>4 - Très bien </option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button disabled={!rating.length} className='mt-3' type='submit' variant='primary'>Ajouter</Button>
                                        </Form>
                                       )
                                        :
                                        <Message>SVP <Link to='/users/abonnez'>Abonnez vous</Link> Pour Ajouter Un Rating{" "} </Message>}
                                </ListGroup.Item>
                    </ListGroup>
            </Col>
            </Row>

          <Row> 
       { CarsOfUserExceptTheClicked.map((car)=>(
           <Col  key={car.voitureId} sm={12} md={6} lg={4} xl={3}>
           <SingleCar car={car}  allcarReviews={allReviewCar}/>
           </Col>
       ))}
   </Row>
        </>
      )}


    </>
  )
}

export default SingleCarScreen
