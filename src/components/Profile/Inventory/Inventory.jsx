import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Inventory.scss'

const Inventory = ({ inventory, uid, sellItem }) => {
  const inventoryReverse = inventory !== undefined ? inventory.slice().reverse() : []
  const inventoryLength = inventory !== undefined ? inventory.length : 0
  const filter = useSelector(state => state.filter.filter)
  const [currentCategory, setCurrentCategory] = useState([])
  const [completedInventory, setCompletedInventory] = useState([])
  const completedLength = inventory !== undefined ? completedInventory.length : 0
  console.log(completedLength)

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
    let currentItems = []
    for (let key of currentCategory) {
      for (let i = 0; i < inventoryLength; i++) {
        if (inventoryReverse[i].color === key) {
          currentItems.push(inventoryReverse[i])
        }
      }
    }
    // если ничего не выбрано, то сетаем все
    setCompletedInventory(currentCategory.length === 0 ? inventoryReverse : currentItems)
    // eslint-disable-next-line
  }, [currentCategory])

  useEffect(() => {
    // если итоговый пустой но инвентарь не пустой
    if (inventoryLength !== 0 && completedLength === 0) {
      setCompletedInventory(inventoryReverse)
    }

    // срабатывает если мы продаем последний айтэм
    if (inventoryLength < completedLength) {
      setCompletedInventory(inventoryLength === 0 ? [] : inventoryReverse)
    }
    // eslint-disable-next-line
  }, [inventory])

  if (inventoryLength === 0) {
    return <div className={'title'}>Ваш инвентарть пустой</div>
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
              onClick={() => sellItem(uid, inventoryLength - i - 1, item.price)}>Продать</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inventory