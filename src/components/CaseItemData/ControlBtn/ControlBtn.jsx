import React from 'react'
import { Link } from 'react-router-dom'
import './ControlBtn.scss'

const ControlBtn = (props) => {
  return (
    <div className={'open-btn'}>
      {props.isAuth &&
       props.allowBuy &&
        !props.duringCarousel &&
         !props.leaveSkin &&
          <button className={'btn btn-min-width'} onClick={props.openCase}>Открыть за {props.price}₽</button>}

      {props.isAuth &&
       !props.allowBuy &&
        <button className={'btn btn-min-width'}>Пополнить баланс</button>}

      {!props.isAuth &&
       <Link className={'btn btn-min-width'} to='/signin'>Войти, чтобы открыть</Link>}

      {props.isAuth &&
       props.dropItem &&
        props.leaveSkin &&
         <div className={'two-btns'}>
          <button onClick={props.leaveSkinInProfile} className={'btn btn-min-width'}>Оставить</button>
          <button className={'btn btn-min-width'} onClick={() => props.sellItem(props.dropPrice)}>Продать за {props.dropPrice}₽</button>
        </div>}

      {props.isAuth &&
       props.duringCarousel &&
        !props.dropItem &&
         <button disabled className={'btn btn-min-width'}>Открывается...</button>}
    </div>
  )
}

export default ControlBtn