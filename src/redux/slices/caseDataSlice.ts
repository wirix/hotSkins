import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface ICaseData {
  id: number,
  imageUrl: string,
  title: string,
  price: number
}

interface IDataSlice {
  caseData: ICaseData[],
  loading: boolean,
  status: boolean
}

export const fetchDataCase = createAsyncThunk(
  'case/fetchDataCase',
  async (params: {id: string}) => {
    const { id } = params
    const { data } = await axios.get(`https://634a618a5df952851410556e.mockapi.io/cases${id === '1' ? '' : id}?id=${id}`)
    return data
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