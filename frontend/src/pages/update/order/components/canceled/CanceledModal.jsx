import { Col, Image, Modal, Row, Avatar, Card, Button, Collapse, Select, Radio, Space, Input, Typography } from 'antd'
import React, { useState } from 'react'
import styles from '../bought/ButtonStyles.module.css'


const CanceledModal = ({ open, setOpen, data }) => {
const [open1, setOpen1] = useState(false)
    const [value, setValue] = useState(1);
    const [fix, setFix] = useState(false)

    const [showQRCode, setShowQRCode] = useState(false);


    const [paymentMethod, setPaymentMethod] = useState("");



    const onChange1 = (e) => {
        setValue(e.target.value);
    };
    if (!data) {
        return null;
    }
    const handleClickOK = () => {

        setOpen(false)
        setValue(1)
    }

    const handleClickCannel = () => {
        setOpen(false)
        setValue(1)
    }

    const onChange = (key) => {
        console.log(key);
    };

    // const items = [
    //     {
    //         key: '1',
    //         label: <div className='font-bold text-[16px]'>Hình thức thanh toán</div>,
    //         children:
    //             <>
    //                 <Radio.Group onChange={onChange1} value={value}>
    //                     <Space direction="vertical">
    //                         <Radio value={1}>Thanh toán khi nhận hàng</Radio>
    //                         <Radio value={2}>Chuyển khoản ngân hàng</Radio>
    //                     </Space>
    //                 </Radio.Group>
    //                 {value === 2 &&
    //                     <img
    //                         src="https://img.vietqr.io/image/TCB-19037144050012-compact.png"
    //                         alt="QR Code"
    //                         width="256"
    //                         height="256"
    //                         className="mx-auto"
    //                     />
    //                 }
    //             </>

    //         ,
    //     },
    // ];

    const total = data?.totalAmount



    const handleClose = () => {
        // dispatch(CreateOrder(formSubmit))
        setOpen1(false)
        // nav('/order')
    }
    const handleOK = () => {
        setOpen1(false)
    }

    const handleCancel = () => {
        setOpen1(false)
    }

    const handlePaymentMethodChange = (e) => {
        const value = e.target.value;
        console.log('values', value);

        setPaymentMethod(value);

        if (value === "bank-transfer") {
            setShowQRCode(true);
        } else {
            setShowQRCode(false);
        }
    };


    return (
        <>
            <Modal
                title={
                    <div className='text-center font-bold text-[18px]'>
                        Chi tiết đơn hàng
                        <hr className='mt-1' />
                    </div>
                }
                open={open}
                onOk={handleClickOK}
                onCancel={handleClickCannel}
                centered
                width={700}

                okButtonProps={{
                    style: {
                        backgroundColor: '#1890ff',
                        borderColor: '#1890ff',
                        color: '#fff'
                    },
                }}
                cancelButtonProps={{
                    style: {
                        color: '#fff',
                        borderColor: '#ff4d4f',
                        backgroundColor: '#ff4d4f'
                    },


                }}
                footer={false}
            >
                <Row
                    gutter={[16, 24]}
                    className={styles.customScrollbarY}
                >
                    <Col className="gutter-row" span={24}>
                        <div className='flex justify-between items-center'>
                            <div className='mb-5 font-bold text-[16px]'>
                                Thông tin khách và vận chuyển
                            </div>
                            <div>
                                <Button
                                    onClick={() => setFix(!fix)}
                                    type='primary'
                                >
                                    {fix ? 'Lưu' : 'Chỉnh sửa'}
                                </Button>
                            </div>
                        </div>
                        <Row gutter={[8, 12]}>
                            <Col className='gutter-row' span={24}>
                                <Row gutter={[8, 12]}>

                                    <Col className='gutter-row' span={24}>
                                        {fix ?
                                            <Row gutter={[8, 12]}>
                                                <Col className='gutter-row' span={24}>
                                                    <Typography className='text-[14px] font-medium'>Số điện thoại</Typography>
                                                    <Input
                                                        defaultValue={data.phone}
                                                    />
                                                </Col>
                                                <Col className='gutter-row' span={24}>
                                                    <Typography className='text-[14px] font-medium'>Địa chỉ:</Typography>
                                                    <Input
                                                        defaultValue={data.address}
                                                    />
                                                </Col>
                                            </Row>
                                            :
                                            <Row gutter={[8, 12]}>
                                                <Col className='gutter-row' span={4}>
                                                    Số điện thoại:
                                                </Col>
                                                <Col className='gutter-row' span={20}>
                                                    {data.phone}
                                                </Col>
                                                <Col className='gutter-row' span={4}>
                                                    Địa chỉ:
                                                </Col>
                                                <Col className='gutter-row' span={20}>
                                                    {data.address}
                                                </Col>
                                            </Row>
                                        }
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <hr />
                    </Col>
                    <Col className='gutter-row' span={24}>
                        <div className='mb-5 font-bold text-[16px]'>
                            Thông tin sản phẩm
                        </div>
                        <Row gutter={[16, 24]}>
                            {data?.productList?.map((item, index) => {
                                const totalPriceItem = item.productId.sellingPrice * item.quantity
                                return (
                                    <Col className='gutter-row' span={24} key={index}>
                                        <Row gutter={[16, 24]}>
                                            <Col className='gutter-row' span={6}>
                                                <Avatar
                                                    shape="square"
                                                    size={150}
                                                    icon={<Image src={item.productId.productImage[0]} />}
                                                />
                                            </Col>
                                            <Col className='gutter-row' span={18}>
                                                <Row gutter={[16, 24]} className='flex items-center'>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]}>
                                                            <Col className='gutter-row' span={24}>
                                                                <Row gutter={[16, 24]} className='flex items-center'>
                                                                    <Col className='gutter-row font-medium' span={24}>
                                                                        <span className=''>{item.productId.productName}</span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col className='gutter-row' span={24}>
                                                                <Row gutter={[16, 24]} className='flex items-center'>
                                                                    <Col className='gutter-row' span={12}>
                                                                        <div>
                                                                            <span className='mr-2 text-[#B0B3B8] line-through'>{item.productId.price.toLocaleString('vi-VN')} đ</span>
                                                                            <span className='font-medium'>{item.productId.sellingPrice.toLocaleString('vi-VN')} đ</span>
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
                                                                        <span className=' ml-1 font-medium'>{totalPriceItem.toLocaleString('vi-VN')} đ</span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                    {/* <Col span={24}>
                        <hr />
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Collapse
                            onChange={onChange}
                            ghost
                            expandIconPosition={'end'}
                            items={items}
                            className={styles.customCollapseHeader}
                        />
                    </Col> */}
                    <Col span={24}>
                        <hr />
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <div className='flex justify-between'>
                            <div className='mb-5 font-bold text-[16px]'>
                                Thanh toán
                            </div>
                           cd 
                        </div>
                        <Row gutter={[16, 24]}>


                            <Col className='gutter-row' span={12}>
                                Thành tiền:
                 cd            </Col>
                            <Col className='gutter-row flex justify-end font-medium' span={12}>
                                {total.toLocaleString('vi-VN')} đ
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        className='flex justify-end'
                        span={24}
                    >
                        <Button
                            color='primary'
                            variant='solid'
                            onClick={() => setOpen1(true)}
                        >
                            Mua lại
                        </Button>
                    </Col>
                </Row >
            </Modal >
            <Modal
                open={open1}
                onOk={handleOK}
                onCancel={handleCancel}
                footer={false}
                closable={false}
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
                        <div className="mb-6 text-center">
                            <img
                                src="https://img.vietqr.io/image/TCB-19037144050012-compact.png"
                                alt="QR Code"
                                width="256"
                                height="256"
                                className="mx-auto"
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
                <div>
                    <Button
                        onClick={handleClose}
                    >
                        Đóng
                    </Button>
                    <Button>
                        Xác nhận
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default CanceledModal
