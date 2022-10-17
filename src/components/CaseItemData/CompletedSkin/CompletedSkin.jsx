import React from 'react'
import './CompletedSkin.scss'

const CompletedSkin = ({ imageUrl }) => {
  return (
    <div className={'completedSkin'}>
      <img src={imageUrl} alt="" />
    </div>
  )
}

export default CompletedSkin