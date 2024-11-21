import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common";
import { useEffect } from "react";
import Context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.userDetail.url, {
      method: SummaryApi.userDetail.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };
  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.countProductInCart.url, {
      method: SummaryApi.countProductInCart.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      setCartProductCount(dataApi?.data);
    }
    if (dataApi.status === "error") {
      toast.error(dataApi.message);
    }
    console.log("dataApi:::",dataApi);
  };

  useEffect(() => {
    document.title = "Shop - Ecommerce";
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] ">
          <Outlet />
        </main>
        {/* <main className="flex-grow h-full">
          <Outlet />
        </main> */}
        <Footer />
      </Context.Provider>
    </>
    // <div className="App">
    //   <Context.Provider
    //     value={{
    //       fetchUserDetails,
    //       cartProductCount,
    //       fetchUserAddToCart,
    //     }}
    //   >
    //     <ToastContainer position="top-center" />
    //     <Header />
    //     <main className="flex-grow h-full">
    //       <Outlet />
    //     </main>
    //     <Footer />
    //   </Context.Provider>
    // </div>
  );
}

export default App;
