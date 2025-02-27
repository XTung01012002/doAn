import React from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { GetAllUserAdmin } from "../store/admin/PageAdmin/getAllUser";

const ChangeUserRole = ({ name, email, role, onClose, userId }) => {
  const [userRole, setUserRole] = useState(role);

  const dispatch = useDispatch()


  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };
  const updateUserRole = async () => {
    const dataResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      onClose();
      dispatch(GetAllUserAdmin())
    }
    if (dataApi.status === "error") {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Thay đổi Vai trò Người dùng</h1>

        <p>Name : {name}</p>
        <p>Email : {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role :</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Đổi quyền
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
