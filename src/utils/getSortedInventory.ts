import { IInventoryInner } from "../@types/interfaces"

export const getSortedInventory = (
  setCompletedInventory: React.Dispatch<React.SetStateAction<IInventoryInner[]>>, 
  inventoryReverse: IInventoryInner[], 
  currentCategory: string[], 
  inventoryLength: number
): void => {
  let currentItems: IInventoryInner[] = []
  for (let key of currentCategory) {
    for (let i = 0; i < inventoryLength; i++) {
      if (inventoryReverse[i].color === key) {
        currentItems.push(inventoryReverse[i])
      }
    }
  }
  // если ничего не выбрано, то сетаем все
  setCompletedInventory(currentCategory.length === 0 ? inventoryReverse : currentItems)
}  