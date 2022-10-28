import React from 'react'
import { useSelector } from 'react-redux'
import './Profile.scss'

const Profile = () => {
  const { inventory } = useSelector(state => state.login)
  console.log(inventory)

  return (
    <div className={'container container-transparent'}>
      <div className={'container-flex'}>
        <div className={'left-side'}>
          <div className={'left-side-title'}>Выбор предметов для обмена</div>
          <div className={'left-side-subtitle'}>
            Всего
            <span> 14 предметов </span>
            на сумму
            <span> 83 351.3 ₽ </span>
          </div>
          <div className={'left-side-rare'}>
            <span className={'rare-title'}>Редкость</span>
            <span className={'rare-item'}>
              <button className={'square square-mystery'}>square</button>
              <span className={'number'}>0</span>
            </span>
            <span className={'rare-item'}>
              <button className={'square square-covert'}>square</button>
              <span className={'number'}>0</span>
            </span>
            <span className={'rare-item'}>
              <button className={'square square-classified'}>square</button>
              <span className={'number'}>0</span>
            </span>
            <span className={'rare-item'}>
              <button className={'square square-restricted'}>square</button>
              <span className={'number'}>0</span>
            </span>
            <span className={'rare-item'}>
              <button className={'square square-mil-spec-grade'}>square</button>
              <span className={'number'}>0</span>
            </span>
          </div>
        </div>
        <div className={'right-side'}>
          <input type="text" className={'right-side-search'} placeholder={'Поиск по названию'} />
          <i className="ri-search-2-line"></i>
        </div>
      </div>
      <div className={'categories'}>
        <div className={'categories-all'}>
          Выбрать все
        </div>
        <div className={'categories-change'}>
          По цене
        </div>
      </div>
      <div className={'profile-skin'}>
        {inventory.map((item, i) => (
          <div key={i} className={'profile-skin-item'}>
            <img src={item.imageUrl} alt="" />
            <span>{item.price} ₽</span>
            <div className={`light light-${item.color === 'Covert Mystery' ? 'Mystery' : item.color}`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile