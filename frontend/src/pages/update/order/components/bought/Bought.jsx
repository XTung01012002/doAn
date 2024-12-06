/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Dropdown, Image, Modal, Row, Space } from 'antd';
import styles from '../CustomScrollY.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataBoughtUser } from '../../../../../store/bought/BoughtUser';
import BoughtModal from './BoughtModal';
import { PaymentOrder } from '../../../../../store/thanhtoan/PaymentOrder';
import { CreateQR } from '../../../../../store/QRcode/CreateQR';




const Bought = () => {
    const [expandedIndices, setExpandedIndices] = useState([]);
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState();
    const [showQRCode, setShowQRCode] = useState(false);

    const qr = useSelector(state => state.createQR.data)
    const dispatch = useDispatch();
    const data = useSelector((state) => state.bought.data);

    const [dataModal, setDataModal] = useState(null);

    useEffect(() => {
        dispatch(fetchDataBoughtUser());
    }, [dispatch]);

    const toggleExpanded = (index) => {
        setExpandedIndices((prev) => {
            const newIndices = [...prev];
            if (newIndices[index]) {
                newIndices[index] = false;
            } else {
                newIndices[index] = true;
            }
            return newIndices;
        });
    };

    const handleSubmit = (items) => {
        setOpen1(true)
        setDataModal(items)
    }


    const handleClose = () => {
        setOpen1(false)
    }

    const handleClickPay = () => {
        if (paymentMethod === 'cash-on-delivery') {
            dispatch(PaymentOrder(dataModal._id))
            setOpen(false)
        } else {
        }
    }

    const handlePaymentMethodChange = (e) => {
        const value = e.target.value;
        console.log('values', value);

        setPaymentMethod(value);

        if (value === "bank-transfer") {
            const tmp = {
                totalAmount: dataModal.totalAmount
            }
            dispatch(CreateQR(tmp))
            setShowQRCode(true);
        } else {
            setShowQRCode(false);
        }
    };




    return (
        <div className={`${styles.customScrollbar}`}>
            <Row gutter={[16, 24]}>
                {data?.map((items, index) => {
                    const isExpanded = expandedIndices[index];
                    const displayItems = isExpanded ? items.productList : [items.productList[0]];
                    console.log('displayIems', items.productList.length);

                    return (
                        <Col className="gutter-row" span={24} key={index}>
                            <Card
                                className='relative'
                            >
                                <span
                                    className={`absolute right-6 top-4 text-[16px] font-semibold  ${(items.paymentStatus === 'Chưa chọn phương thức thanh toán' || items.paymentStatus === 'Thanh toán khi nhận hàng') ? 'text-[#ff4242]' : 'text-[#3538fa]'}`}
                                >
                                    {items.paymentStatus}
                                </span>
                                {displayItems?.map((item, itemIndex) => {
                                    const totalPriceItem = item.productId?.sellingPrice * item.quantity;

                                    return (
                                        <Row gutter={[16, 24]} key={itemIndex} className='mb-4'>
                                            <Col className='gutter-row flex justify-center items-center' span={6}>
                                                <Avatar
                                                    shape="square"
                                                    size={150}
                                                    icon={<Image src={item.productId?.productImage[0]} />}
                                                />
                                            </Col>
                                            <Col className='gutter-row' span={18}>
                                                <Row gutter={[16, 24]} className='flex items-center'>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]}>
                                                            <Col className='gutter-row' span={24}>
                                                                <Row gutter={[16, 24]} className='flex items-center'>
                                                                    <Col className='gutter-row' span={24}>
                                                                        <span className='font-medium'>{item.productId?.productName}</span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col className='gutter-row' span={24}>
                                                                <Row gutter={[16, 24]} className='flex items-center'>
                                                                    <Col className='gutter-row' span={12}>
                                                                        <div>
                                                                            <span className='mr-2 text-[#B0B3B8] line-through'>{item.productId?.price.toLocaleString('vi-VN')} đ</span>
                                                                            <span className='font-medium'>{item.productId?.sellingPrice.toLocaleString('vi-VN')} đ</span>
                                                                            {/* <span className='font-medium'>{item.productId?.sellingPrice} đ</span> */}
                                                                        </div >
                                                                    </Col>
                                                                    <Col className='gutter-row flex justify-end' span={12}>
                                                                        <span className='font-medium'>x {item.quantity}</span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]}>
                                                            <Col className='gutter-row' span={24}>
                                                                <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                                                    <Col className='gutter-row flex items-center justify-end' span={24}>
                                                                        <span className=''>{item.quantity} sản phẩm: </span>
                                                                        <span className='ml-1 font-medium'>{totalPriceItem.toLocaleString('vi-VN')} đ</span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    );
                                })}
                                <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                    <Col className='gutter-row flex items-center justify-end' span={24}>
                                        <span className=''>Tổng tiền: </span>
                                        <span className=' ml-1 font-medium'>{items.totalAmount.toLocaleString('vi-VN')} đ</span>
                                    </Col>
                                </Row>

                                <Row gutter={[16, 24]} className='flex mt-4 items-center justify-end'>
                                    <Col className='gutter-row flex items-center justify-end' span={24}>
                                        <Button
                                            variant='solid'
                                            color='primary'
                                            className='mr-2'
                                            onClick={() => { setOpen(true); setDataModal(items) }}
                                        >
                                            Xem chi tiết
                                        </Button>
                                        {(items.paymentStatus === 'Chưa chọn phương thức thanh toán' || items.paymentStatus === 'Thanh toán khi nhận hàng') &&
                                            <Button
                                                variant='solid'
                                                color='danger'
                                                onClick={() => handleSubmit(items)}
                                            >
                                                Thanh toán ngay
                                            </Button>
                                        }

                                    </Col>
                                </Row>

                                {items.productList.length > 1 &&
                                    <div className="flex items-center justify-center mt-4">
                                        <div className="w-1/4 border-t border-gray-300"></div>
                                        <div className="mx-4 text-center">
                                            {items.productList.length > 1 && !isExpanded && (
                                                <Row className="">
                                                    <Button
                                                        className={styles.noHover}
                                                        color="default"
                                                        variant="text"
                                                        onClick={() => toggleExpanded(index)}
                                                    >
                                                        Xem thêm
                                                    </Button>
                                                </Row>
                                            )}
                                            {isExpanded && (
                                                <Row className="">
                                                    <Button
                                                        className={styles.noHover}
                                                        color="default"
                                                        variant="text"
                                                        onClick={() => toggleExpanded(index)}
                                                    >
                                                        Thu gọn
                                                    </Button>
                                                </Row>
                                            )}
                                        </div>
                                        <div className="w-1/4 border-t border-gray-300"></div>
                                    </div>
                                }
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <BoughtModal
                open={open}
                setOpen={setOpen}
                data={dataModal}
            />
            <Modal
                title={<div className='text-center'>Chọn phương thức thanh toán</div>}
                open={open1}
                onCancel={() => setOpen1(false)}
                footer={false}
                closable={false}
                centered
            >
                <div>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="bank-transfer"
                            name="payment-method"
                            value="bank-transfer"
                            checked={paymentMethod === "bank-transfer"}
                            onChange={handlePaymentMethodChange}
                            className="mr-2"
                            required
                        />
                        <label htmlFor="bank-transfer" className="text-gray-700">
                            Chuyển khoản ngân hàng
                        </label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="cash-on-delivery"
                            name="payment-method"
                            value="cash-on-delivery"
                            checked={paymentMethod === "cash-on-delivery"}
                            onChange={handlePaymentMethodChange}
                            className="mr-2"
                            required
                        />
                        <label htmlFor="cash-on-delivery" className="text-gray-700">
                            Thanh toán khi nhận hàng
                        </label>
                    </div>
                    {showQRCode ? (
                        <div className="text-center">
                            <img
                                src={qr.qrUrl}
                                alt=""
                            />
                            <p className="mt-2 text-gray-700">
                                Quét mã QR để thực hiện thanh toán chuyển khoản
                            </p>
                        </div>
                    )
                        :
                        <></>
                    }
                </div>
                <div className="flex justify-end">
                    <Space>
                        <Button
                            onClick={handleClose}
                        >
                            Đóng
                        </Button>
                        {paymentMethod === "cash-on-delivery" &&
                            <Button
                                type="primary"
                                onClick={handleClickPay}
                            >
                                Xác nhận
                            </Button>
                        }

                    </Space>
                </div>
            </Modal>
        </div>
    );
};

export default Bought;
