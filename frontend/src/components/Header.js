import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { Navbar,Nav,Container,NavDropdown } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

const Header = () => {
   
  const navigate=useNavigate()

  const user=useSelector(state=>state.user)
  const {userLogin}=user

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
       <div className='abonnement'>
       {userLogin ? (
          <>
           <NavDropdown   title={userLogin.userName && userLogin.userName.toUpperCase()}   >
                <LinkContainer to={`users/profile`} >
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                {userLogin && userLogin.roles && userLogin.roles.includes("Proprietaire") &&  (
                  <>
                <LinkContainer to='/voiture/ajouterVoiture'>
                 <NavDropdown.Item>Ajouter Voiture</NavDropdown.Item>
               </LinkContainer>
                 <LinkContainer to='/voiture/Voitures'>
                 <NavDropdown.Item>Voitures</NavDropdown.Item>
               </LinkContainer>
               </>
               )}
                </NavDropdown>

         <Nav.Link className='signIn navItems abb'  onClick={logoutHandler} style={{color:'red'}}><i className='fa-solid fa-arrow-right-from-bracket'></i> Se déconnecter</Nav.Link>
             </>
           ) :(
            <>
              <LinkContainer to="users/abonnez" >
              <Nav.Link className='signIn navItems abb'><i className='fas fa-user' ></i> S'abonnez</Nav.Link>
              </LinkContainer>
               <LinkContainer to="users/register ">
               <Nav.Link className='signIn navItems abb'><i className='fas fa-user-plus' ></i> S'inscrire</Nav.Link>
               </LinkContainer>
               </>
           )}
      </div>
           </Navbar.Collapse>
           </Navbar>
    </header>
  )
}

export default Header
