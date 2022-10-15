import React from 'react'
import './CaseItem.scss'

const CaseItem = ({ imageUrl, title, price }) => {
  const maxLength = 22

  return (
    <div className={'cases-item'}>
      <img src={imageUrl} alt="" />
      <div className={'subtitle'}>{title.slice(0, maxLength)}{title.length > 22 ? '...' : null}</div>
      <button className={'btn'}>{price}P</button>
    </div>
  )
}

export default CaseItem