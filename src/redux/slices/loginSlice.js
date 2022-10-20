import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  balance: 0,
  username: '',
  uid: '',
  isDataProfile: false
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
      state.isDataProfile = true
    },
  },
})

export const { setDataAccount } = loginSlice.actions

export default loginSlice.reducer