import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import WarahouseReducer from './admin/warehouse/Warahouse'
import BoughtUserReducer from './bought/BoughtUser'

export const store = configureStore({
  reducer: {
    user: userReducer,
    warahouse: WarahouseReducer,
    bought: BoughtUserReducer
  },
})