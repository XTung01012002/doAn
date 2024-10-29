import React from "react";
import { Modal } from "antd";
import { displayVNDCurrency } from "../helpers/displayVNDCurrency";

const PaymentMethodModal = ({ visible, onClose, onSelect, totalPrice }) => {
    const handlePaymentMethodChange = (method) => {
        onSelect(method);
        onClose();
    };

    return (
        <Modal
            title="Chọn Phương Thức Thanh Toán"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <div className="flex flex-col">
                <h3 className="mb-4">Tổng cộng: {displayVNDCurrency(totalPrice)}</h3>

                <button
                    onClick={() => handlePaymentMethodChange("bank-transfer")}
                    className="mb-2 p-2 bg-blue-500 text-white rounded"
                >
                    Chuyển khoản ngân hàng
                </button>
                <button
                    onClick={() => handlePaymentMethodChange("cash-on-delivery")}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Thanh toán khi nhận hàng
                </button>
            </div>
        </Modal>
    );
};

export default PaymentMethodModal;
