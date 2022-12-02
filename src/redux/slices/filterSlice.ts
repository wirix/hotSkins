import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IFilterRare {
  mysteryRare: boolean,
  covertRare: boolean,
  classifiedRare: boolean,
  restrictedRare: boolean,
  milSpecGradeRare: boolean,
}

const initialState: {
  filter: IFilterRare
} = {
  filter: {
    mysteryRare: false,
    covertRare: false,
    classifiedRare: false,
    restrictedRare: false,
    milSpecGradeRare: false
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, actions: PayloadAction<IFilterRare>) => {
      state.filter = {
        ...state.filter,
        mysteryRare: actions.payload.mysteryRare,
        covertRare: actions.payload.covertRare,
        classifiedRare: actions.payload.classifiedRare,
        restrictedRare: actions.payload.restrictedRare,
        milSpecGradeRare: actions.payload.milSpecGradeRare,
      }
    }
  }
})

export const { setFilters } = filterSlice.actions

export default filterSlice.reducer