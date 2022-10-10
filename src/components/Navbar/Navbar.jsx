import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className={'container'}>
      <header className={'header'}>
        <div className={'burger'}>
          <i className="ri-menu-2-line"></i>
          <Link to={'/'} className={'logo'}><span>Hot</span><span>Skins</span></Link>
        </div>
        <div className={'info'}>
          <Link to={'/help'}>Помощь</Link>
          <Link to={'/contacts'}>Контакты</Link>
        </div>
        <Link to={'/login'} className={'btn'}>Войти</Link>
      </header>
    </div>
  )
}

export default Navbar