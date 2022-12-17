import { FC } from 'react'
import { useSelector } from 'react-redux'
import { IInventoryInner } from '../../@types/interfaces'
import { updateBalanceUser, updateInventoryUser } from '../../firebase'
import { RootState } from '../../redux/store'
import CategoriesRare from './CategoriesRare/CategoriesRare'
import Inventory from './Inventory/Inventory'
import './Profile.scss'

export type TypeSellItem = (uid: string, indexItem: number, price: number) => void

const Profile: FC = () => {
  const { inventory, uid, balance } = useSelector((state: RootState) => state.login)

  // нужен общий интерфэйс для профиля и инвенторя
  const sellItem: TypeSellItem = (uid, indexItem, price) => {
    let arr: IInventoryInner[] = inventory.filter((_, i) => i !== indexItem)
    updateInventoryUser(uid, arr)
    // округление до сотых
    updateBalanceUser(uid, parseFloat((balance + price).toFixed(2)))
  }

  let inventoryLength: number = inventory !== undefined ? inventory.length : 0

  const getInventorySum = (): number => {
    let arrPriceInventory: number[] = []
    // поулчили стоимость инвенторя
    if (inventory !== undefined) {
      for (let i = 0; i < inventory.length; i++) {
        arrPriceInventory.push(inventory[i].price)
      }
    }
    let currentPriceInventory: number = 0
    for (let j = 0; j < arrPriceInventory.length; j++) {
      currentPriceInventory += arrPriceInventory[j]
    }
    return currentPriceInventory
  }

  if (inventory === undefined) {
    return <div>Загрузка...</div>
  }

  return (
    <div className={'container container-transparent'}>
      <div className={'container-profile'}>
        <div className={'left-side'}>
          <div className={'left-side-title'}>Выбор предметов для обмена</div>
          <div className={'left-side-subtitle'}>
            Всего
            <span> {inventoryLength} предметов </span>
            на сумму
            <span> {getInventorySum().toFixed(2)} ₽ </span>
          </div>
          <CategoriesRare inventory={inventory} />
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