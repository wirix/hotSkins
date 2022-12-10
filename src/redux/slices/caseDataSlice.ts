import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface ISkinItems {
  StatTrak: boolean,
  property: string,
  image: string,
  price: number
}

export interface ISkin {
  skinId: number,
  color: string,
  type: string,
  skinTitle: string,
  skinItems: ISkinItems[]
}

interface ICase {
  id: number,
  title: string,
  price: number,
  imageUrl: string,
  skins: ISkin[]
}

interface IDataSlice {
  caseData: [] | ICase,
  loading: boolean,
  status: boolean
}

export const fetchDataCase = createAsyncThunk(
  'case/fetchDataCase',
  async (params: { id: string }) => {
    try {
      const { id } = params
      const { data } = await axios.get(`https://634a618a5df952851410556e.mockapi.io/cases${id === '1' ? '' : id}?id=${id}`)
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetchDataCase ${error}`)
      }
    }
  }
)

const initialState: IDataSlice = {
  caseData: [],
  loading: false,
  status: false,
}

export const caseDataSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataCase.pending, (state) => {
      state.loading = true
      state.status = false
    })
      .addCase(fetchDataCase.fulfilled, (state, action) => {
        state.caseData = action.payload[0]
        state.loading = false
        state.status = true
      })
      .addCase(fetchDataCase.rejected, (state) => {
        state.loading = false
        state.status = false
      })
  }
})

export default caseDataSlice.reducer