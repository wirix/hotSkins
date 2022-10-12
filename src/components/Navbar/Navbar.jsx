import React, {useState} from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import userPhoto from '../../assets/img/userPhoto.png'
import { useEffect } from 'react'
import { useRef } from 'react'

const Navbar = () => {
  const [isNavbar, setIsNavbar] = useState(false)
  const iconRef = useRef(null)

  useEffect(() => {
    const handleEventClick = (e) => {
      if (!e.path.includes(iconRef.current)) {
        setIsNavbar(false)
      }
    }
    document.body.addEventListener('click', handleEventClick)

    return () => document.body.removeEventListener('click', handleEventClick)
  }, [])

  return (
    <div className={'container'}>
      <header className={'header'}>
          <div className={`navbar-mobile ${isNavbar ? 'navbar-mobile-open' : 'navbar-mobile-close'}`}>
            <div className={'container container-transparent'}>
              <div className={'account'}>
                <div>
                  <img src={userPhoto} alt="" />
                  <div className={'username'}>Wirix</div>
                  <div className={'email'}>email@gmail.com</div>
                </div>
                <i className="ri-logout-box-line"></i>
              </div>
              <div className={'link'}>
                <Link to='/' className={'link-item'}>
                  Помощь
                </Link>
                <Link to='/' className={'link-item'}>
                  Контакты
                </Link>
              </div>
            </div>
          </div>
        <div className={'burger'}>
          {
            isNavbar ? <i ref={iconRef} className="ri-close-line" onClick={() => setIsNavbar(!isNavbar)}></i>
            : <i ref={iconRef} className="ri-menu-2-line" onClick={() => setIsNavbar(!isNavbar)}></i>
          }
          <Link to={'/'} className={'logo'}><span>Hot</span><span>Skins</span></Link>
        </div>
        <div className={'info'}>
          <Link to={'/help'}>Помощь</Link>
          <Link to={'/contacts'}>Контакты</Link>
        </div>
        <Link to={'/signin'} className={'btn'}>Войти</Link>
      </header>
    </div>
  )
}

export default Navbar