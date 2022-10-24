import React from 'react'
import './Contacts.scss'
import imgContact from '../../assets/img/imgContact.jpg'

const Contacts = () => {
  return (
    <div className={'contacts'}>
      <div>Делали:</div>
      <div className={'fffff'}>
        <div>Я</div>
        <img width={'320px'} src={imgContact} alt="" />
      </div>
    </div>
  )
}

export default Contacts