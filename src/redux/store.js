import { configureStore } from '@reduxjs/toolkit'
import caseDataSlice from './slices/caseDataSlice'
import casesSlice from './slices/casesSlice'
import loginSlice from './slices/loginSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cases: casesSlice,
    caseData: caseDataSlice,
  }
})

window.store = store