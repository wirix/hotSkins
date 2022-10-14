import './App.scss';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { Navigate, Route, Routes } from 'react-router-dom';
import SighIn from './components/SignIn/SignIn';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import GetAuth from './utils/GetAuth';
import { auth } from './firebase';
import { useDispatch } from 'react-redux'
import { setEmail } from './redux/slices/loginSlice';
import { useEffect } from 'react';

const App = () => {
  const isAuth = GetAuth()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (auth.currentUser) {
      dispatch(setEmail())
    }
  }, [isAuth, dispatch])
 
  return (
    <div className={'app'}>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to='/home' /> : <Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SighIn />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App