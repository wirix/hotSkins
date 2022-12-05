import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface ICasesData {
  id: number,
  imageUrl: string,
  title: string,
  price: number
}

interface ICasesSlice {
  cases: ICasesData[] | [],
  loading: boolean,
  status: boolean,
}

export const fetchCases = createAsyncThunk(
  'cases/fetchCases',
  async () => {
    try {
      const { data } = await axios.get(`https://634a618a5df952851410556e.mockapi.io/hotSkins`)
      return data
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
      }
    }
  }
)

const initialState: ICasesSlice = {
  cases: [],
  loading: false,
  status: false,
}

export const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCases.pending, (state) => {
      state.loading = true;
      state.status = false
    })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.cases = action.payload;
        state.loading = false;
        state.status = true
      })
      .addCase(fetchCases.rejected, (state) => {
        state.loading = false;
        state.status = false
      })
  },
})

export default casesSlice.reducer