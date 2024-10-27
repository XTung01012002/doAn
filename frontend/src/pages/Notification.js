import React from 'react';
import {useNavigate} from 'react-router-dom';

const Notification = () => {

  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center min-h-screen p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-md w-full border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Thông báo
        </h1>
        <p className="text-gray-800 text-center text-lg">
          Đơn hàng của bạn đang chờ đơn vị vận chuyển.
        </p>
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => navigate("/")}
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
