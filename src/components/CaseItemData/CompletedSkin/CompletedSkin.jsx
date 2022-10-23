import React from 'react'
import './CompletedSkin.scss'

const CompletedSkin = ({ type, price, StatTrak, property, color, imageUrl, skinTitle }) => {
  return (
    <div className={`completed-skin`}>
      <span className={`bg ${color}`}></span>
      <img src={imageUrl} alt="" />
      <div className={'info'}>
        <div className={'info-type'}>
          <span>
            {StatTrak && <span>★StatTrak <span> | </span></span> }
          </span>
          {type} | {skinTitle}
        </div> 
        <div className={'info-property'} >
          {property}
        </div>
        <div className={'price'}>{price} ₽</div>
      </div>
    </div>
  )
}

export default CompletedSkin