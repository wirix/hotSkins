import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setName: (state, actions) => {
      debugger
      state.name = actions.payload
    }
  },
})

export const { setName } = loginSlice.actions

export default loginSlice.reducer