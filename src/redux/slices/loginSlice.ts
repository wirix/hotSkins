import { IInventoryInner } from './../../@types/interfaces';
import { createSlice } from '@reduxjs/toolkit'

interface ILoginSlice {
  email: string,
  balance: number,
  username: string,
  uid: string,
  luckyChance: number,
  inventory: [] | IInventoryInner[],
  isDataProfile: boolean,
}

const initialState: ILoginSlice = {
  email: '',
  balance: 0,
  username: '',
  uid: '',
  luckyChance: 0,
  inventory: [],
  isDataProfile: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setDataAccount: (state, actions) => {
      state.username = actions.payload.username
      state.email = actions.payload.email
      state.balance = actions.payload.balance.toFixed(2)
      state.uid = actions.payload.uid
      state.luckyChance = actions.payload.luckyChance
      const inventoryWithIndex: IInventoryInner[] = []
      let actionInvenory = actions.payload.inventory
      if (actionInvenory) {
        for (let i = 0; i < actionInvenory.length; i++) {
          const itemWithIndex: IInventoryInner = actionInvenory[i]
          // добаляем индекс чтобы продовался правильный айтэм в сортировке
          itemWithIndex.index = i
          inventoryWithIndex.push(itemWithIndex)
        }
      }
      state.inventory = inventoryWithIndex
      state.isDataProfile = true
    },
  },
})

export const { setDataAccount } = loginSlice.actions

export default loginSlice.reducer