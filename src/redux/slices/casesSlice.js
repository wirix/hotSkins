import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCases = createAsyncThunk(
  'cases/fetchCases',
  async () => {
    const { data } = await axios.get(`https://634a618a5df952851410556e.mockapi.io/hotSkins`)
    return data
  }
)

const initialState = {
  cases: [],
  loading: false,
}

export const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setCases: (state, actions) => {
      state.cases = actions.payload
    },
    deleteCases: (state) => {
      debugger
      state.cases = []
    },
  },
  extraReducers: {
    [fetchCases.pending]: (state) => {
      state.loading = true;
    },
    [fetchCases.fulfilled]: (state, action) => {
      state.cases = action.payload;
      state.loading = false;
    },
    [fetchCases.rejected]: (state) => {
      state.loading = false;
    },
  },
})

export const { setCases, deleteCases } = casesSlice.actions

export default casesSlice.reducer