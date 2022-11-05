import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCases = createAsyncThunk(
  'cases/fetchCases',
  async () => {
    try {
      const { data } = await axios.get(`https://634a618a5df952851410556e.mockapi.io/hotSkins`)
      return data
    } catch (e) {
      console.log(e)
    }
  }
)

const initialState = {
  cases: [],
  loading: false,
  status: false,
}

export const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setCases: (state, actions) => {
      state.cases = actions.payload
    },
    deleteCases: (state) => {
      state.cases = []
    },
  },
  extraReducers: {
    [fetchCases.pending]: (state) => {
      state.loading = true;
      state.status = false
    },
    [fetchCases.fulfilled]: (state, action) => {
      state.cases = action.payload;
      state.loading = false;
      state.status = true
    },
    [fetchCases.rejected]: (state) => {
      state.loading = false;
      state.status = false
    },
  },
})

export const { setCases, deleteCases } = casesSlice.actions

export default casesSlice.reducer