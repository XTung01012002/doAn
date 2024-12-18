import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Notification from "../pages/Notification";
import Payment from "../pages/Payment";
import ProductCategory from "../pages/ProductCategory";
import ProductDetail from "../pages/ProductDetail";
import RequestForgotPassword from "../pages/RequestForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SearchProduct from "../pages/SearchProduct";
import SignUp from "../pages/SignUp";
import OrderPage from '../pages/update/order';
// import Warehouse from "../pages/update/admin/warehouse/components/Warehouse";
import PageAdmin from "../pages/update/admin/PageAdmin";
import WarehouseAdmin from "../pages/update/admin/warehouse";
import ProfileAccount from "../pages/update/profile";
import Staff from "../pages/update/staff/Staff";


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
      {
        path: 'profileAccount',
        element: <ProfileAccount />,
        children: [
          {
            path: ":key",
            element: <ProfileAccount />,
          },
        ],
      }
    ],
  },
]);

export default router;
