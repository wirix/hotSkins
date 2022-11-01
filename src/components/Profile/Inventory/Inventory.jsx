import React from 'react'
import './Inventory.scss'

const Inventory = ({ inventory, uid, sellItem, categoryObj }) => {
  // сюда приходят условия (жел, крас в obj) с помощью for мы проверяем есть ли цвет в категорях если да то в комплитмассив добваляем все тру элементы, если obj пустой то выводим все
  const inventoryReverse = inventory.slice().reverse()

  return (
    <div className={'container-inventory'}>
      <div className={'profile-skin'}>
        {inventoryReverse === undefined || inventoryReverse.length === 0
          ? <div>Ваш инвентарь пустой</div>
          : inventoryReverse.map((item, i) => (
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
    </div>
  )
}

export default Inventory