import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchDataCase = createAsyncThunk(
  'case/fetchDataCase',
  async (params) => {
    let { id } = params
    const { data } = await axios.get(`https://634a618a5df952851410556e.mockapi.io/cases${id === '1' ? '' : id}?id=${id}`)
    return data
  }
)

const initialState = {
  caseData: [],
  loading: false,
  status: false,
}

export const caseDataSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {
    setDataCase: (state, actions) => {
      state.caseData = actions.payload
    },
  },
  extraReducers: {
    [fetchDataCase.pending]: (state) => {
      state.loading = true
      state.status = false
    },
    [fetchDataCase.fulfilled]: (state, action) => {
      state.caseData = action.payload[0]
      state.loading = false
      state.status = true
    },
    [fetchDataCase.rejected]: (state) => {
      state.loading = false
      state.status = false
    }
  }
})

export const { setDataCase } = caseDataSlice.actions

export default caseDataSlice.reducer