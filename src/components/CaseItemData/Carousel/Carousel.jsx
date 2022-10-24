import React from 'react'
import './Carousel.scss'

const Carousel = ({ fullObjSkins, skinsLength }) => {
  let randomLeft = Math.random()
  let randomRight = Math.random()
  
  return (
    <div className={'carousel'}>
      <div className={'carousel-border'}></div>
      <div className={'carousel-container'} style={{ transform: `translateX(${Math.round(randomLeft * 50 - randomRight * 50)}px)`}}>
        {fullObjSkins.map((obj, i) => (
          <div
          key={i}
            className={`carousel-item ${obj.color}`}
            style={{
              transform: `translateX(-${122 * (skinsLength - 3) * 2}px)`
            }}>
            <div className={'carousel-item-img'}>
              <div><img src={obj.imageUrl} alt="" /></div>
              <div className={'carousel-item-title'}>{obj.skinTitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel