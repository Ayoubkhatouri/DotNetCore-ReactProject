
import {Container} from 'react-bootstrap'
import{BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AjouterVoitureScreen from './screens/AjouterVoitureScreen';
import SingleCarScreen from './screens/SingleCarScreen';
import ListAllCarsOfOwnerScreen from './screens/ListAllCarsOfOwnerScreen';
import UpdateCarScreen from './screens/UpdateCarScreen';
import ListAllUsersScreen from './screens/ListAllUsersScreen';
import UserUpdateByAdminScreen from './screens/UserUpdateByAdminScreen';
import MarqueAndModelScreen from './screens/MarqueAndModelScreen';
import OffresSpecialScreen from './screens/OffresSpecialScreen';
import VoitureFavoriesScreen from './screens/VoitureFavoriesScreen';
import DemandeMadeByUserScreen from './screens/DemandeMadeByUserScreen';



function App() {
  return (
    <>
    <Router>
    <Header/>
    <main>
      <Container>
      <Routes>
      <Route path="/" element={<HomeScreen/>}/>
      <Route path="/users/abonnez" element={<LoginScreen/>}/>
    <Route path="/users/register" element={<RegisterScreen/>}/>
    <Route path='/users/profile' element={<ProfileScreen/>}/>
    <Route path='/voiture/AjouterVoiture' element={<AjouterVoitureScreen/>}/>
    <Route path='/Voiture/:id' element={<SingleCarScreen/>}/>
    <Route path='/voiture/Voitures' element={<ListAllCarsOfOwnerScreen/>}/>
    <Route path='/voiture/modifier/:id' element={<UpdateCarScreen/>}/>
    <Route path='/users/all' element={<ListAllUsersScreen/>}/>
    <Route path='/admin/users/modifier/:id' element={<UserUpdateByAdminScreen/>}/>
    <Route path='/admin/marqueModel' element={<MarqueAndModelScreen/>}/>
    <Route path='/voiture/Voitures/offreSpecial' element={<OffresSpecialScreen/>}/>
    <Route path='/users/VoituresFavories' element={<VoitureFavoriesScreen/>}/>
    <Route path='/users/demandes' element={<DemandeMadeByUserScreen/>}/>
    </Routes>
      </Container>
    </main>
    <Footer/>
    </Router>
    </>
  );
}

export default App;
