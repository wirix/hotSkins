import './App.scss';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import SighIn from './components/SignIn/SignIn';
import Login from './components/Login/Login';
import {useLocation} from 'react-router-dom'

const App = () => {
  const location = useLocation()
  return (
    <div className={'app'}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SighIn />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      {
        location.pathname !== '/signin' && 
        location.pathname !== '/login' && 
        location.pathname !== '/' ? <Footer /> : null
      }
    </div>
  )
}

export default App