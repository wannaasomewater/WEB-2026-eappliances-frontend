import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
interface FilterState { minPower: number; }
const initialState: FilterState = { minPower: 0 };
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMinPower: (state, action: PayloadAction<number>) => { state.minPower = action.payload; },
    resetFilters: (state) => { state.minPower = 0; }
  },
});
export const { setMinPower, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;