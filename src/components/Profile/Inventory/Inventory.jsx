import React from 'react'
// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import loading from '../../../assets/img/loading.svg'
import './Inventory.scss'

const Inventory = ({ inventory, uid, sellItem }) => {
  const inventoryReverse = inventory !== undefined ? inventory.slice().reverse() : []
  const inventoryLength = inventory !== undefined ? inventory.length : 0

  // const filter = useSelector(state => state.filter.filter)
  // const { isDataProfile } = useSelector(state => state.login)

  // let categoryChoose = {}
  // const [completedInventory, setCompletedInventory] = useState([])
  
  // useEffect(() => {
  //   debugger
  //   if (filter.mysteryRare) {
  //     categoryChoose.mysteryRare = 'Mystery'
  //   }
  //   if (filter.covertRare) {
  //     categoryChoose.covertRare = 'Covert'
  //   }
  //   if (filter.classifiedRare) {
  //     categoryChoose.classifiedRare = 'Classified'
  //   }
  //   if (filter.restrictedRare) {
  //     categoryChoose.restrictedRare = 'Restricted'
  //   }
  //   if (filter.milSpecGradeRare) {
  //     categoryChoose.milSpecGradeRare = 'Mil-Spec-Grade'
  //   }
  //   console.log(categoryChoose)
  //   debugger
  // }, [filter])

  // // для первоой загрузки
  // useEffect(() => {
  //   if (!categoryChoose.mysteryRare && 
  //     !filter.covertRare && 
  //     !filter.classifiedRare && 
  //     !filter.restrictedRare && 
  //     !filter.milSpecGradeRare) {
  //       debugger
  //       setCompletedInventory(inventoryReverse)
  //       console.log(completedInventory)
  //   }
  // }, [inventory])

  // useEffect(() => {
  //   if (!categoryChoose.mysteryRare && 
  //     !filter.covertRare && 
  //     !filter.classifiedRare && 
  //     !filter.restrictedRare && 
  //     !filter.milSpecGradeRare) {
  //       debugger
  //       setCompletedInventory(inventoryReverse)
  //       console.log(completedInventory)
  //   }
  //   // не пихать categoryChoose - макс глубина
  // }, [filter])

  // useEffect(() => {
  //   let sortedItems = []
  //   for (let key of Object.values(categoryChoose)) {
  //     for (let i = 0; i < inventoryLength; i++) {
  //       if (key === completedInventory[i].color) {
  //         debugger
  //         sortedItems = [...sortedItems, completedInventory[i]]
  //         console.log(sortedItems)
  //         setCompletedInventory(sortedItems)
  //       }
  //     }
  //   }
  // }, [categoryChoose])

  // debugger

  // if (!isDataProfile) {
  //   return <img src={loading} alt='' />
  // }

  // console.log(completedInventory)
  // debugger
  return (
    <div className={'container-inventory'}>
      <div className={'profile-skin'}>
        {inventoryReverse.map((item, i) => (
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