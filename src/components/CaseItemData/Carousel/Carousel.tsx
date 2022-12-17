import { FC } from 'react'
import { IInventoryInner } from '../../../@types/interfaces'
import { IRandomSkins } from '../CaseItemData'
import './Carousel.scss'

interface ICarouselProps {
  fullObjSkins: (IRandomSkins | IInventoryInner)[],
  skinsLength: number
}

const Carousel: FC<ICarouselProps> = ({ fullObjSkins, skinsLength }) => {
  let randomTranslateX: number = Math.random() * 55
  return (
    <div className={'carousel'}>
      <div className={'carousel-border'}></div>
      <div className={'carousel-container'} style={{ transform: `translateX(${Math.random() >= 0.5 ? -randomTranslateX : randomTranslateX}px)` }}>
        {fullObjSkins.map((obj: IRandomSkins | IInventoryInner, i: number) => (
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