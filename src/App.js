import './App.scss';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SighIn from './components/SignIn/SignIn';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { auth } from './firebase';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import Profile from './components/Profile/Profile';
import { useAuthState } from "react-firebase-hooks/auth";
import CaseItemData from './components/CaseItemData/CaseItemData';
import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { setDataAccount } from './redux/slices/loginSlice';
import Contacts from './components/Contacts/Contacts';
import { setFilters } from './redux/slices/filterSlice';

const App = () => {
  const [isAuth, loading] = useAuthState(auth);
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (auth.currentUser) {
      // загрузка в redux данных профиля
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid
          const database = getDatabase();
          const balance = ref(database, 'users/' + uid)
          onValue(balance, (snapshot) => {
            const data = snapshot.val();
            dispatch(setDataAccount(data))
          });
        }
      });
    }
  }, [isAuth, dispatch])

  useEffect(() => {
    if (location.pathname !== '/profile') {
      let startFilter = {
        mysteryRare: false,
        covertRare: false,
        classifiedRare: false,
        restrictedRare: false,
        milSpecGradeRare: false,
      }
      dispatch(setFilters(startFilter))
    }
  }, [location.pathname])
  

  if (loading) {
    return null
  }
  
  return (
    <div className={'app'}>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to='/home' /> : <Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={!isAuth ? <Navigate to='/home' /> : <Profile />} />
        <Route path="/signin" element={<SighIn />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cases/:id' element={<CaseItemData />} />
        <Route path='/contacts' element={<Contacts />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App