import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import WarahouseReducer from './admin/warehouse/Warahouse'
import BoughtUserReducer from './bought/BoughtUser'
import CanceledReducer from './canceled/CanceledUser'
import CreateShipInfoReducer from './shipinfo/ShipInfoCreate'
import GetAllInfoShipOrderReducer from './shipinfo/GetAllOrderShipInfo'
import PutProductStaffReducer from './staff/EditProduct'
import PostUploadProductReducer from './admin/upProduct/UpProductReducer'
import CanceledOrderReducer from './createCart/CreateCartSlice'
import PutCancelOrderReducer from './bought/PutCancelOrder'
import PostInventoryreceiptCreateReducer from './admin/createBill/CreateBill'
import GetBillReducer from './admin/getBill/GetBill'
import GetAllUserAdminReducer from './admin/PageAdmin/getAllUser'
import GetStatisticalReducer from './admin/PageAdmin/getStatistical'
import GetDeliveredReducer from './delivered/Delivered'
import GetRateReducer from './rate/getRate'
import CreateQRReducer from './QRcode/CreateQR'
import PaymentOrderReducer from './thanhtoan/PaymentOrder'
import CommnetOrderReducer from './delivered/modeldeli'
import GetCommentProductReducer from './delivered/getCommnetproduct'
import GetAllCancelOrderSaleReducer from './getAllCancelOrderSale/GetAllCancelOrderSale'
import FetchDataAcceptReducer from './staff/FetchDataAccept'


export const store = configureStore({
  reducer: {
    user: userReducer,
    warehouse: WarahouseReducer,
    bought: BoughtUserReducer,
    cancel: CanceledReducer,
    createShipInfo: CreateShipInfoReducer,
    getAllShipInfo: GetAllInfoShipOrderReducer,
    putProductStaff: PutProductStaffReducer,
    postUpProduct: PostUploadProductReducer,
    statusCanceled: CanceledOrderReducer,
    statusPutCancel: PutCancelOrderReducer,
    createBill: PostInventoryreceiptCreateReducer,
    getBill: GetBillReducer,
    getAllUserAdmin: GetAllUserAdminReducer,
    getStatistical: GetStatisticalReducer,
    getDeliver: GetDeliveredReducer,
    getRate: GetRateReducer,
    createQR: CreateQRReducer,
    nhanhang: PaymentOrderReducer,
    createComment: CommnetOrderReducer,
    getComment: GetCommentProductReducer,
    getAllCancelSale: GetAllCancelOrderSaleReducer,
    fetchAccept: FetchDataAcceptReducer
  },
})