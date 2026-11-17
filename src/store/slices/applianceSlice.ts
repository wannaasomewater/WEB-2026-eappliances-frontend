import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ElectricalAppliance } from '../../types';
import { mockAppliances } from '../../mockData';

interface ApplianceState { items: ElectricalAppliance[]; status: 'idle' | 'loading' | 'failed'; }
const initialState: ApplianceState = { items: [], status: 'idle' };

export const fetchAppliances = createAsyncThunk('appliances/fetch', async (minPower: number) => {
  try {
    const response = await axios.get(`/api/appliances?minPower=${minPower}`);
    return response.data;
  } catch (error) {
    return mockAppliances.filter(item => item.power >= minPower);
  }
});

export const addAppliance = createAsyncThunk('appliances/add', async (newItem: Omit<ElectricalAppliance, 'id'>, { dispatch }) => {
  await axios.post('/api/appliances', newItem);
  dispatch(fetchAppliances(0));
});

export const deleteAppliance = createAsyncThunk('appliances/delete', async (id: number, { dispatch }) => {
  await axios.delete(`/api/appliances/${id}`);
  dispatch(fetchAppliances(0));
});

const applianceSlice = createSlice({
  name: 'appliances',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliances.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchAppliances.fulfilled, (state, action) => { state.status = 'idle'; state.items = action.payload; })
      .addCase(fetchAppliances.rejected, (state) => { state.status = 'failed'; });
  },
});
export default applianceSlice.reducer;