import React from 'react'
import './CompletedSkin.scss'

const CompletedSkin = ({ type, price, StatTrak, property, color, imageUrl, skinTitle }) => {
  return (
    <div className={'completedSkin'}>
      <img src={imageUrl} alt="" />
      <div>{type} | {skinTitle} {StatTrak && 'статтрек'}</div>
      <div>{property}</div>
      <div>{price} ₽</div>
    </div>
  )
}

export default CompletedSkin