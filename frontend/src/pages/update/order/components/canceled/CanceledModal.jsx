import { Col, Image, Modal, Row, Avatar, Button, Input, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from '../bought/ButtonStyles.module.css'
import { CreateOrder, DeleteOrder } from '../../../../../store/createCart/CreateCartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchDataCanceledUser } from '../../../../../store/canceled/CanceledUser'


const CanceledModal = ({ open, setOpen, data, quantityProduct, setQuantityProduct, phone, setPhone, address, setAddress, setTotalAllAmount, totleAllAmount }) => {

    const dispatch = useDispatch()
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [fix, setFix] = useState(false)
    const [formData, setFormData] = useState()
    const [showQRCode, setShowQRCode] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const loadingCreate = useSelector(state => state.statusCanceled.loadingCreateOrder)
    const subCreate = useSelector(state => state.statusCanceled.subCreateOrder)
    const nav = useNavigate()
    const subDele = useSelector(state => state.statusCanceled.subDeleteOrder)

    console.log(data);


    // console.log('quantityProductdata', data);
    // console.log('quantityProduct123123123', quantityProduct);
    // console.log('quantityProduct', quantityProduct[0]?.quantity);




    const info = () => {
        messageApi.info('Xóa sản phẩm thành công!');
    };

    useEffect(() => {
        const tmp = []
        quantityProduct.forEach(item => tmp.push({
            productId: item.productId,
            quantity: item.quantity
        }))
        setFormData(
            {
                phone: phone,
                address: address,
                productList: tmp
            }
        )
    }, [quantityProduct, phone, address])


    useEffect(() => {
        const total = quantityProduct.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
        setTotalAllAmount(total);
    }, [quantityProduct]);


    useEffect(() => {
        if (subCreate) {
            setOpen(false)
            setOpen1(false)
            dispatch(DeleteOrder(data._id))
        }
    }, [subCreate])
    useEffect(() => {
        if (subDele) {
            dispatch(fetchDataCanceledUser())
        }
    }, [subDele])

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeAddess = (e) => {
        setAddress(e.target.value)
    }


    const handleClickCannel = () => {
        setQuantityProduct([])
        setOpen(false)
    }


    const total = data?.totalAmount



    const handleClose = () => {
        dispatch(CreateOrder(formData))
        // setOpen1(false)
        // nav('/order')
    }
    const handleOK = () => {
        setOpen1(false)
    }

    const handleCancel = () => {
        setOpen1(false)
    }
    const handleOK1 = () => {
        setOpen2(false)
    }

    const handleCancel1 = () => {
        setOpen2(false)
    }

    const totalAmountProduct = (amount, quantity) => {
        return amount * quantity
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

    const handleUp = (index) => {
        const datanew = [...quantityProduct];
        datanew[index].quantity = datanew[index].quantity + 1;
        setQuantityProduct(datanew)
    }

    const handleDown = (index) => {
        const datanew = [...quantityProduct]
        if (datanew[index].quantity > 1) {
            datanew[index].quantity = datanew[index].quantity - 1;
            setQuantityProduct(datanew)
        } else info()
    }


    const handleBuy = () => {
        console.log('formData', formData);
        setOpen1(true)
    }



    if (!data) {
        return null;
    }


    return (
        <>
            {contextHolder}
            <Modal
                title={
                    <div className='text-center font-bold text-[18px]'>
                        Chi tiết đơn hàng
                        <hr className='mt-1' />
                    </div>
                }
                open={open}
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
                                                        onChange={onChangePhone}
                                                    />
                                                </Col>
                                                <Col className='gutter-row' span={24}>
                                                    <Typography className='text-[14px] font-medium'>Địa chỉ:</Typography>
                                                    <Input
                                                        defaultValue={data.address}
                                                        onChange={onChangeAddess}
                                                    />
                                                </Col>
                                            </Row>
                                            :
                                            <Row gutter={[8, 12]}>
                                                <Col className='gutter-row' span={4}>
                                                    Số điện thoại:
                                                </Col>
                                                <Col className='gutter-row' span={20}>
                                                    {phone}
                                                </Col>
                                                <Col className='gutter-row' span={4}>
                                                    Địa chỉ:
                                                </Col>
                                                <Col className='gutter-row' span={20}>
                                                    {address}
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
                                const totalPriceItem = item.productId.sellingPrice * item.quantity;

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
                                                                    {/* <Col className='gutter-row flex justify-end' span={12}>
                                                                        <span className='font-medium'>x {item.quantity}</span>
                                                                    </Col> */}
                                                                    <Col className='gutter-row flex justify-end' span={12}>
                                                                        <div>
                                                                            <Button
                                                                                className='px-2'
                                                                                onClick={() => handleDown(index)}
                                                                            >
                                                                                -
                                                                            </Button>
                                                                            <span className='px-2'>{quantityProduct[index]?.quantity}</span>
                                                                            <Button
                                                                                className='px-2'
                                                                                onClick={() => handleUp(index)}
                                                                            >
                                                                                +
                                                                            </Button>

                                                                        </div>
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
                                                                        <span className=''>{quantityProduct[index]?.quantity} sản phẩm: </span>
                                                                        <span className=' ml-1 font-medium'>{totalAmountProduct(item.productId.sellingPrice, quantityProduct[index]?.quantity).toLocaleString('vi-VN')} đ</span>
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
                        </div>
                        <Row gutter={[16, 24]}>


                            <Col className='gutter-row' span={12}>
                                Thành tiền:
                            </Col>
                            <Col className='gutter-row flex justify-end font-medium' span={12}>
                                {totleAllAmount && totleAllAmount.toLocaleString('vi-VN')} đ
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
                            onClick={handleBuy}
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
                        loading={loadingCreate}
                    >
                        Đóng
                    </Button>
                    <Button>
                        Xác nhận
                    </Button>
                </div>
            </Modal>


            <Modal
                open={open2}
                onOk={handleOK1}
                onCancel={handleCancel1}
                footer={false}
                closable={false}
            >

            </Modal>
        </>
    )
}

export default CanceledModal
