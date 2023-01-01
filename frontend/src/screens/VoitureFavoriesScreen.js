import React ,{useEffect,useState}from 'react'
import {Row,Col} from 'react-bootstrap'
import SingleCar from '../components/SingleCar'
import {useDispatch,useSelector} from 'react-redux'
import {getFavoriteUser} from '../features/user/userSlice'

const VoitureFavoriesScreen = () => {
    const dispatch=useDispatch()
    const user=useSelector(state=>state.user)
    const {userLogin}=user
    const {isLoadingAllUserFavorite,isSuccessAllUserFavorite,isErrorAllUserFavorite,messageAllUserFavorite,AllUserFavorite}=user.AllUserFavoriteInfo


    useEffect(()=>{
       
        if(userLogin && userLogin.userId)
        dispatch(getFavoriteUser(userLogin.userId))
    },[dispatch,userLogin && userLogin.userId])
  return (
    <div>
        {!AllUserFavorite.length ?
        <h1 className='addLine mb-4 mt-3'>Vous n'avez pas de Favories</h1> :
        <>
           <h1 className='addLine mb-4 mt-3'>Les Voitures Favories</h1>
       <Row> 
      {AllUserFavorite.map((car)=>(
          <Col  key={car.voitureId} sm={12} md={6} lg={4} xl={3}>
          <SingleCar car={car}/>
          </Col>
      ))}
  </Row>
  </>}
    </div>
  )
}

export default VoitureFavoriesScreen
