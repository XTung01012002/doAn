import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import WarahouseReducer from './admin/warehouse/Warahouse'
import BoughtUserReducer from './bought/BoughtUser'
import CanceledReducer from './canceled/CanceledUser'
import CreateShipInfoReducer from './shipinfo/ShipInfoCreate'
import GetAllInfoShipOrderReducer from './shipinfo/GetAllOrderShipInfo'


export const store = configureStore({
  reducer: {
    user: userReducer,
    warehouse: WarahouseReducer,
    bought: BoughtUserReducer,
    cancel: CanceledReducer,
    createShipInfo: CreateShipInfoReducer,
    getAllShipInfo: GetAllInfoShipOrderReducer
  },
})