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
      state.balance = actions.payload.balance
      state.uid = actions.payload.uid
      state.luckyChance = actions.payload.luckyChance
      state.inventory = actions.payload.inventory
      state.isDataProfile = true
    },
  },
})

export const { setDataAccount } = loginSlice.actions

export default loginSlice.reducer