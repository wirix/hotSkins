import React from 'react'
import './Carousel.scss'

const Carousel = ({ fullObjSkins, skinsLength }) => {
  let randomTranslateX = Math.random() * 55

  return (
    <div className={'carousel'}>
      <div className={'carousel-border'}></div>
      <div className={'carousel-container'} style={{ transform: `translateX(${Math.random() >= 0.5 ? -randomTranslateX : randomTranslateX}px)` }}>
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