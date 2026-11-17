import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import filterReducer from './slices/filterSlice';
import applianceReducer from './slices/applianceSlice';

export const store = configureStore({
  reducer: { auth: authReducer, filter: filterReducer, appliances: applianceReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;