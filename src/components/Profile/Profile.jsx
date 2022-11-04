import React from 'react'
import { useSelector } from 'react-redux'
import { updateBalanceUser, updateInventoryUser } from '../../firebase'
import CategoriesRare from './CategoriesRare/CategoriesRare'
import Inventory from './Inventory/Inventory'
import './Profile.scss'

const Profile = () => {
  const { inventory, uid, balance } = useSelector(state => state.login)

  const sellItem = (uid, indexItem, price) => {
    debugger
    let arr = inventory.filter((item, i) => i !== indexItem)
    updateInventoryUser(uid, arr)
    updateBalanceUser(uid, Math.round(balance + price))
  }

  let inventoryLength = inventory !== undefined ? inventory.length : 0
  let inventorySum = inventory !== undefined && inventory.reduce((sum, item) => sum + item.price, 0)
  
  return (
    <div className={'container container-transparent'}>
      <div className={'container-profile'}>
        <div className={'left-side'}>
          <div className={'left-side-title'}>Выбор предметов для обмена</div>
          <div className={'left-side-subtitle'}>
            Всего
            <span> {inventoryLength} предметов </span>
            на сумму
            <span> {Math.round(inventorySum)} ₽ </span>
          </div>
          <CategoriesRare />
        </div>
        <div className={'right-side'}>
          <button className={'btn'} onClick={() => updateBalanceUser(uid, balance + 3000)}>Добавить 3000руб на аккаунт</button>
        </div>
      </div>
      <Inventory uid={uid} inventory={inventory} sellItem={sellItem} />
    </div>
  )
}

export default Profile