import React from 'react'
import './Footer.scss';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className={'container container-footer'}>
      <footer className={'footer'}>
        <div className={'copyright'}>Copyright © Skincash.ru</div>
        <div>
          <Link to='/'>Помощь</Link>
          <Link to='/'>Контакты</Link>
          <Link to='/'>Пользовательское соглашение</Link>
        </div>
      </footer>
    </div>
  )
}

export default Footer