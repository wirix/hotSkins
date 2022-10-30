import React from 'react'
import './Inventory.scss'

const Inventory = ({inventory, uid, sellItem}) => {
  return (
    <div className={'profile-skin'}>
      {inventory === undefined || inventory.length === 0
      ? <div>Ваш инвентарь пустой</div>
      : inventory.map((item, i) => (
        <div key={i} className={'profile-skin-item'}>
          <img src={item.imageUrl} alt="" />
          <span>{item.price} ₽</span>
          <div className={`light light-${item.color === 'Covert Mystery' ? 'Mystery' : item.color}`}></div>
          <button
            className={`btn btn-small-${item.color === 'Covert Mystery' ? 'Mystery' : item.color}`}
            onClick={() => sellItem(uid, i, item.price)}>Продать</button>
        </div>
      ))}
    </div>
  )
}

export default Inventory