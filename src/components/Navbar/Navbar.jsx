import React, { useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import userPhoto from '../../assets/img/userPhoto.png'
import { useRef } from 'react'
import { logout } from '../../firebase'
import GetAuth from '../../utils/GetAuth'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const iconRef = useRef(null)
  const isAuth = GetAuth()

  const { username, balance } = useSelector(state => state.login)

  const [isNavbar, setIsNavbar] = useState(false)

  const linkLogout = () => {
    setIsNavbar(false)
    logout()
  }

  // Если большой баланс, ставим троеточие
  let correctBalance
  if (String(balance).length > 6 && balance) {
    correctBalance = String(balance).slice(0, 6) + '...'
  } else {
    correctBalance = String(balance)
  }

  return (
    <div className={'container'}>
      <header className={'header'}>
        <div className={`navbar-mobile ${isNavbar ? 'navbar-mobile-open' : 'navbar-mobile-close'}`}>
          <div className={'container container-transparent'}>
            <div className={'link'}>
              {isAuth && 
              <Link to='/profile' className={'link-item'} onClick={() => setIsNavbar(false)}>
                Профиль
              </Link>}
              <Link to='/home' className={'link-item'} onClick={() => setIsNavbar(false)}>
                Кейсы
              </Link>
              <Link to='/' className={'link-item'} onClick={() => setIsNavbar(false)}>
                Монетка
              </Link>
              <Link to='/' className={'link-item'} onClick={() => setIsNavbar(false)}>
                Помощь
              </Link>
              <Link to='/contacts' className={'link-item'} onClick={() => setIsNavbar(false)}>
                Контакты
              </Link>
              {isAuth ? 
              <Link onClick={linkLogout} to='/' className={'link-item'}>
                Выйти
              </Link> : 
              <Link onClick={linkLogout} to='/signin' className={'link-item'}>
                Войти
              </Link>}
            </div>
          </div>
        </div>
        <div className={'burger'}>
          {
            isNavbar ? <i ref={iconRef} className="ri-close-line" onClick={() => setIsNavbar(!isNavbar)}></i>
              : <i ref={iconRef} className="ri-menu-2-line" onClick={() => setIsNavbar(!isNavbar)}></i>
          }
          <Link to={`${isAuth ? '/home' : '/'}`} className={'logo'}><span>Hot</span><span>Skins</span></Link>
        </div>
        <div className={'info'}>
          <Link to={'/home'}>Кейсы</Link>
          <Link to={'/home'}>Монетка</Link>
        </div>
        {isAuth &&
          <div className={'account'}>
            <div className={'account-container'} style={{ width: correctBalance.length < 6 && '100%'}}>
              <Link className={'account-photo'} to='/profile'>
                <img src={userPhoto} alt="" />
              </Link>
              <div className={'account-info'}>
                <Link className={'account-info-username'} to='/profile'>{username}</Link>
                <div className={'account-info-balance'} style={{ width: correctBalance.length < 6 && '120px' }}>
                  Баланс: 
                  <span style={{ fontSize: correctBalance.length >= 7 && '13px'}}>
                     {correctBalance}руб
                  </span>
                </div>
              </div>
            </div>
            
            <i onClick={() => logout()} className="ri-logout-box-line"></i>
          </div>}
        {isAuth ? null : <Link to={'/signin'} className={'btn'}>Войти</Link>}
      </header>
    </div>
  )
}

export default Navbar