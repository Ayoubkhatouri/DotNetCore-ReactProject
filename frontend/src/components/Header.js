import React,{useContext, useEffect} from 'react'
import {  useNavigate } from 'react-router-dom'
import { Navbar,Nav,Container,NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { getUserDetails } from '../features/user/userSlice'
import context1 from '../context1'


const Header = () => {

  const {isEn,setIsEn}=useContext(context1)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const user=useSelector(state=>state.user)
  const {userLogin}=user

  const {LoadingUserDetails,ErrorUserDetails,userDetails}=user.UserDetailsInfo

  
  useEffect(()=>{
    if(userLogin)
    dispatch(getUserDetails(userLogin.userId))
},[dispatch,userLogin])

  const logoutHandler=()=>{
    localStorage.removeItem('userLogin')
    navigate('/')
    window.location.reload()

  }

  return (
    <header>
          <Navbar bg="primary" variant='dark'  expand="lg" collapseOnSelect className='myNav'>
     
     <LinkContainer to='/'>
       <Navbar.Brand className='logo'>CAR RENTAL</Navbar.Brand>
       </LinkContainer>

       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
       <div className='abonnement '>
       {userLogin ? (
          <>
           <NavDropdown style={{
            marginRight:"20px"
           }} title={userLogin.userName && userLogin.userName.toUpperCase()}   >
                <LinkContainer to={`users/profile`} >
                  <NavDropdown.Item>{isEn ? "Profil":"Profile"}</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`users/VoituresFavories`} >
                  <NavDropdown.Item>{isEn ? "Favorite Cars": "Voitures en Favoris"}</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`users/demandes`} >
                  <NavDropdown.Item>{isEn ? "Demands Sent":"Demandes Envoyées"} </NavDropdown.Item>
                </LinkContainer>
                {((userLogin && userLogin.roles && userLogin.roles.includes("Proprietaire")) || userDetails.isAgence)&&  (
                  <>
                  <LinkContainer to={`users/demandes/recus`} >
                  <NavDropdown.Item>{isEn ? "Demands Received":"Demandes Reçus"}</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/voiture/ajouterVoiture'>
                 <NavDropdown.Item>{isEn ? "Add Car":"Ajouter Voiture"}</NavDropdown.Item>
               </LinkContainer>
                 <LinkContainer to='/voiture/Voitures'>
                 <NavDropdown.Item>{isEn ? "Cars":"Voitures"}</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to='/voiture/Voitures/offreSpecial'>
                 <NavDropdown.Item>{isEn ? "Special Offers Management":"Gestion Offres Special"}</NavDropdown.Item>
                 </LinkContainer>
                 
                 {userLogin && userLogin.roles && userLogin.roles.includes("Admin") && (
                  <>
                  <LinkContainer to='/users/all'>
                   <NavDropdown.Item>{isEn ? "Users":"Utilisateurs"}</NavDropdown.Item>
                 </LinkContainer>
                   <LinkContainer to='admin/marqueModel'>
                   <NavDropdown.Item>{isEn ? "Brand/Model Management":"Gestion Marque/Modèle"}</NavDropdown.Item>
                  </LinkContainer>
                  </>
                 )}
                
               </>
               )}
                </NavDropdown>

         <Nav.Link className='signIn navItems abb'  onClick={logoutHandler} style={{color:'gold'}}><span className='hoverMe'><i className='fa-solid fa-arrow-right-from-bracket'></i>{isEn ? "Logout":"Se Déconnecter"} </span></Nav.Link>
             </>
           ) :(
            <>
              <LinkContainer to="users/abonnez" >
              <Nav.Link className='signIn navItems abb'><i className='fas fa-user' ></i> {isEn ? "Login":"Se Connecter"}</Nav.Link>
              </LinkContainer>
               <LinkContainer to="users/register ">
               <Nav.Link className='signIn navItems abb'><i className='fas fa-user-plus' ></i> {isEn ? "Register":"S'inscrire"}</Nav.Link>
               </LinkContainer>
               </>
           )}
           
            
      </div>
      <Button style={{
                backgroundColor:"white",
                marginRight:"10px"

            }} onClick={()=>setIsEn(()=>!isEn)}> <span style={{
              color:"#2c3e50",
              fontWeight:"bold"
            }}>{isEn ? "French":"Anglais"}</span></Button>
           </Navbar.Collapse>
           </Navbar>
    </header>
  )
}

export default Header
