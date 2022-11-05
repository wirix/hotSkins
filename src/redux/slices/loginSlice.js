import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
      let inventoryWithIndex = []
      let actionInvenory = actions.payload.inventory
      if (actionInvenory) {
        for (let i = 0; i < actionInvenory.length; i++) {
          const itemsWithIndex = actionInvenory[i]
          // добаляем индекс чтобы продовался правильный айтэм в сортировке
          itemsWithIndex.index = i
          inventoryWithIndex.push(itemsWithIndex)
        }
      }
      state.inventory = inventoryWithIndex
      state.isDataProfile = true
    },
  },
})

export const { setDataAccount } = loginSlice.actions

export default loginSlice.reducer