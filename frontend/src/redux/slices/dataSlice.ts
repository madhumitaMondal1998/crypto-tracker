import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PriceData {
  symbol: string;
  price: number;
  timestamp: string;
}

interface DataState {
  data: PriceData[];
  symbol: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DataState = {
  data: [],
  symbol: 'BTC',
  status: 'idle',
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (symbol: string) => {
    const response = await axios.get(`/api/data/${symbol}`);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSymbol } = dataSlice.actions;
export const selectData = (state: any) => state.data.data;
export const selectSymbol = (state: any) => state.data.symbol;
export const selectStatus = (state: any) => state.data.status;
export default dataSlice.reducer;
