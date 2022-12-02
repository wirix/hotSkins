import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import caseDataSlice from './slices/caseDataSlice'
import casesSlice from './slices/casesSlice'
import filterSlice from './slices/filterSlice'
import loginSlice from './slices/loginSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cases: casesSlice,
    caseData: caseDataSlice,
    filter: filterSlice,
  }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch