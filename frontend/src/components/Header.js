import React from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { useState } from "react";
import Context from "../context/index";
import { useContext } from "react";
import { useLocation } from "react-router";
import { Button } from "antd";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);

  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogOut = async () => {
    const fetchData = await fetch(SummaryApi.logOut.url, {
      method: SummaryApi.logOut.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataApi = await fetchData.json();
    console.log(dataApi);
    if (dataApi.success) {
      setMenuDisplay(!menuDisplay)
      toast.success(dataApi.message);
      dispatch(setUserDetails(null));
      navigate("/login");
    }
    if (dataApi.status === "error") {
      toast.error(dataApi.message);
    }
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Hàm xử lý sự kiện nhấp chuột vào nút tìm kiếm
  const handleSearchClick = () => {
    if (search) {
      navigate(`/search?q=${search}`);
    } else {
      navigate(`/search`);
    }
  };
  console.log("user", user);

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          {
            <Link to="/">
              <Logo w={90} h={50} />
            </Link>
          }
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within: shadow pl-2">
          <input
            type="text"
            placeholder="Bạn tìm gì..."
            className="w-full outline-none"
            onChange={handleSearchChange}
            value={search}
          />
          <button
            className="text-lg min-w-[50px] h-8 bg-red-600  hover:bg-red-700 flex items-center justify-center rounded-r-full text-white"
            onClick={handleSearchClick}
          >
            <GrSearch />
          </button>
        </div>

        <div className="flex items-center gap-7 ">
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}


          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bottom-0 top-11 h-fit px-10 py-4 shadow-2xl shadow-slate-400 rounded z-50 bg-white">
                <nav>
                  {user?.role === "ADMIN" && (
                    <Link
                      to={"/admin-panel"}
                      className="whitespace-nowrap hidden md:block text-center hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay(!menuDisplay)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to={'/staff'}
                    className="whitespace-nowrap hidden md:block text-center hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(!menuDisplay)}
                  >
                    Nhân viên
                  </Link>
                  <Link
                    to={'admin-warehouse'}
                    className="whitespace-nowrap hidden md:block text-center hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(!menuDisplay)}
                  >
                    Kho
                  </Link>
                  <Link
                    to={'/order'}
                    className="whitespace-nowrap hidden md:block text-center hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(!menuDisplay)}
                  >
                    Đơn hàng
                  </Link>
                  {user?._id && (
                    <div className="flex justify-center">
                      <Button
                        onClick={handleLogOut}
                        className=" rounded-full"
                        type="primary"
                        variant="solid"
                        color="danger"
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  )}
                </nav>
              </div>
            )}
          </div>



          <div>
            {/* {user?._id ? (
              <button
                onClick={handleLogOut}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Đăng nhập
              </Link>
            )} */}
            {!user?._id && (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
