import { useEffect, useState, FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IInventoryInner } from '../../../@types/interfaces'
import { IFilterRare } from '../../../redux/slices/filterSlice'
import { RootState } from '../../../redux/store'
import { getSortedInventory } from '../../../utils/getSortedInventory'
import { TypeSellItem } from '../Profile'
import './Inventory.scss'

interface ICategoryName<TValue> {
  [index: string]: TValue
}

interface IInventoryProps {
  uid: string,
  inventory: IInventoryInner[],
  sellItem: TypeSellItem
}

const Inventory: FC<IInventoryProps> = ({ uid, inventory, sellItem }) => {
  const inventoryReverse: IInventoryInner[] = inventory !== undefined ? inventory.slice().reverse() : []
  const inventoryLength: number = inventory !== undefined ? inventory.length : 0
  const filter: IFilterRare = useSelector((state: RootState) => state.filter.filter)
  const [currentCategory, setCurrentCategory] = useState<string[]>([])
  const [completedInventory, setCompletedInventory] = useState <IInventoryInner[]>([])
  const completedLength: number = inventory !== undefined ? completedInventory.length : 0

  // выбор категориии
  useEffect(() => {
    let categoryName: ICategoryName<string> = {
      mysteryRare: 'Covert Mystery',
      covertRare: 'Covert',
      classifiedRare: 'Classified',
      restrictedRare: 'Restricted',
      milSpecGradeRare: 'Mil-Spec-Grade',
    }
    for (let key in categoryName) {
      // если категория выбрана и ее нет в массиве, то сетаем
      if (filter[key] && !currentCategory.includes(categoryName[key])) {
        setCurrentCategory([...currentCategory, categoryName[key]])
        // но если не выбрана категория и она есть в массиве, то удаляем
      } else if (!filter[key] && currentCategory.includes(categoryName[key])) {
        setCurrentCategory(currentCategory.filter(item => item !== categoryName[key]))
      }
    }
    // eslint-disable-next-line
  }, [filter])

  // айтэмы подходящие по категории сетаются
  useEffect(() => {
    getSortedInventory(setCompletedInventory, inventoryReverse, currentCategory, inventoryLength)
    // eslint-disable-next-line
  }, [currentCategory])

  useEffect(() => {
    // если итоговый пустой но инвентарь не пустой
    if (inventoryLength !== 0 && completedLength === 0) {
      setCompletedInventory(inventoryReverse)
    }
    setCompletedInventory(inventoryLength === 0 ? [] : inventoryReverse)
    // срабатывает если мы продаем последний айтэм
    if (inventoryLength < completedLength) {
      setCompletedInventory(inventoryLength === 0 ? [] : inventoryReverse)
    } else if (inventoryLength > completedLength) {
      // после продажи в режиме категорий обновляем completedInventory
      getSortedInventory(setCompletedInventory, inventoryReverse, currentCategory, inventoryLength)
    }
    // eslint-disable-next-line
  }, [inventory])

  if (inventoryLength === 0) {
    return <div className={'profile-title'}>
      <div className={'suptitle'}>Ваш инвентарть пустой</div>
      <div>
        <span>Перейти в </span>
        <Link className={'profile-link'} to={'/home'}>Кейсы</Link>
      </div>
    </div>
  }

  return (
    <div className={'container-inventory'}>
      <div className={'profile-skin'}>
        {completedInventory.map((item: IInventoryInner, i: number) => (
          <div key={i} className={'profile-skin-item'}>
            <img src={item.imageUrl} alt="" />
            <span>{item.price} ₽</span>
            <div className={`light light-${item.color === 'Covert Mystery' ? 'Mystery' : item.color}`}></div>
            <button
              className={`btn btn-small-${item.color === 'Covert Mystery' ? 'Mystery' : item.color}`}
              onClick={() => sellItem(uid, item.index, item.price)}>Продать</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inventory