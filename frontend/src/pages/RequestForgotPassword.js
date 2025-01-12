import React, { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RequestForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.requestPasswordReset.url, {
      method: SummaryApi.requestPasswordReset.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success("Vui lòng kiểm tra email...");
    }
    if (dataApi.status === "error") {
      toast.error("Tài khoản không tồn tại");
    }
  };

  return (
    <body class="antialiased">
      <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Quên mật khẩu</h1>
        <p class="text-slate-500">Điền thông tin vào mẫu để lấy lại mật khẩu</p>

        <form action="" class="my-10" onSubmit={handleSubmit}>
          <div class="flex flex-col space-y-5">
            <label for="email">
              <p class="font-medium text-slate-700 pb-2">Địa chỉ email:</p>
              <input
                type="email"
                placeholder="Nhập địa chỉ email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              />
            </label>

            <button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Đặt lại mật khẩu</span>
            </button>
            <p class="text-center">
              Bạn chưa có tài khoản?{" "}
              <Link to="/sign-up">
                <a
                  href="#"
                  class="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Đăng kí </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </body>
  );
};

export default RequestForgotPassword;
