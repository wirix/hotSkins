import { createSlice } from '@reduxjs/toolkit'
import { auth } from '../../firebase';

const initialState = {
  email: '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state) => {
      if (auth.currentUser) {
        state.email = auth.currentUser.email
      }
    }
  },
})

export const { setEmail } = loginSlice.actions

export default loginSlice.reducer