import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RequestForgotPassword from "../pages/RequestForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import AllProduct from "../pages/AllProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import ProductCategory from "../pages/ProductCategory";
import Payment from "../pages/Payment";
import ResetPassword from "../pages/ResetPassword";
import Notification from "../pages/Notification";
import OrderPage from '../pages/update/order'
// import Warehouse from "../pages/update/admin/warehouse/components/Warehouse";
import Staff from "../pages/update/staff/Staff";
import WarehouseAdmin from "../pages/update/admin/warehouse";
import PageAdmin from "../pages/update/admin/PageAdmin";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <RequestForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      // {
      //   path: "admin-panel",
      //   element: <AdminPanel />,
      //   children: [
      //     {
      //       path: "all-users",
      //       element: <AllUser />,
      //     },
      //     {
      //       path: "all-products",
      //       element: <AllProduct />,
      //     },
      //   ],
      // },
      {
        path: 'admin-panel',
        element: <PageAdmin />,
        children: [
          {
            path: ':key',
            element: <PageAdmin />
          }
        ]
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "product-category",
        element: <ProductCategory />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "order",
        element: <OrderPage />,
        children: [
          {
            path: ':key',
            element: <OrderPage />,
          }
        ]
      },
      {
        path: "admin-warehouse",
        element: <WarehouseAdmin />,
        children: [
          {
            path: ":key",
            element: <WarehouseAdmin />,
          },
        ],
      },
      {
        path: "staff",
        element: <Staff />,
        children: [
          {
            path: ":key",
            element: <Staff />,
          },
        ],
      },
    ],
  },
]);

export default router;
