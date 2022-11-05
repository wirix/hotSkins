import React from 'react'
import { Link } from 'react-router-dom'
import './ControlBtn.scss'

const ControlBtn = ({
  isAuth,
  allowBuy,
  duringCarousel,
  leaveSkin,
  openCase,
  price,
  dropItem,
  skinItem,
  sellItem,
  dropPrice,
  leaveSkinInProfile,
}) => {
  return (
    <div className={'open-btn'}>
      {isAuth &&
        allowBuy &&
        !duringCarousel &&
        !leaveSkin &&
        <button className={'btn btn-min-width'} onClick={openCase}>Открыть за {price}₽</button>}
        
      {isAuth &&
        !allowBuy &&
        !duringCarousel &&
        !leaveSkin &&
        <Link to='/profile' className={'btn btn-min-width'}>Пополнить баланс</Link>}

      {!isAuth &&
        <Link className={'btn btn-min-width'} to='/signin'>Войти, чтобы открыть</Link>}

      {isAuth &&
        dropItem &&
        leaveSkin &&
        <div className={'two-btns'}>
          <button onClick={() => leaveSkinInProfile(skinItem)} className={'btn btn-min-width'}>Оставить</button>
          <button className={'btn btn-min-width'} onClick={() => sellItem(dropPrice)}>Продать за {dropPrice}₽</button>
        </div>}

      {isAuth &&
        duringCarousel &&
        !dropItem &&
        <button disabled className={'btn btn-min-width'}>Открывается...</button>}
    </div>
  )
}

export default ControlBtn