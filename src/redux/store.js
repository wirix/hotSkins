import { configureStore } from '@reduxjs/toolkit'
import casesSlice from './slices/casesSlice'
import loginSlice from './slices/loginSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cases: casesSlice,
  }
})

window.store = store