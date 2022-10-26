import React from 'react'
import './CompletedSkin.scss'

const CompletedSkin = ({ skinItem }) => {
  return (
    <div className={`completed-skin`}>
      <span className={`bg ${skinItem.color}`}></span>
      <img src={skinItem.imageUrl} alt="" />
      <div className={'info'}>
        <div className={'info-type'}>
          {skinItem.StatTrak && <span className={'StatTrak'}>★StatTrak <span> | </span></span> }
          {skinItem.type} | {skinItem.skinTitle}
        </div> 
        <div className={'info-property'} >
          {skinItem.property}
        </div>
        <div className={'price'}>{skinItem.price} ₽</div>
      </div>
    </div>
  )
}

export default CompletedSkin