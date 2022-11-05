import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSortedInventory } from '../../../utils/getSortedInventory'
import './Inventory.scss'

const Inventory = ({ inventory, uid, sellItem }) => {
  const inventoryReverse = inventory !== undefined ? inventory.slice().reverse() : []
  const inventoryLength = inventory !== undefined ? inventory.length : 0
  const filter = useSelector(state => state.filter.filter)
  const [currentCategory, setCurrentCategory] = useState([])
  const [completedInventory, setCompletedInventory] = useState([])
  const completedLength = inventory !== undefined ? completedInventory.length : 0

  // выбор категориии
  useEffect(() => {
    let categoryName = {
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
        {completedInventory.map((item, i) => (
          <div key={i} className={'profile-skin-item'}>
            <img src={item.imageUrl} alt="" />
            <span>{item.price} ₽</span>
            <div className={`light light-${item.color === 'Covert Mystery' ? 'Mystery' : item.color}`}></div>
            <button
              className={`btn btn-small-${item.color === 'Covert Mystery' ? 'Mystery' : item.color}`}
              onClick={() => sellItem(uid, item.index, Number(item.price).toFixed(2))}>Продать</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inventory