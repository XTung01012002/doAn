import { Col, Image, Modal, Row, Avatar, Button, Input, Typography, message, Collapse, Radio, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from '../bought/ButtonStyles.module.css'
import { CreateOrder, DeleteOrder, setSubCreate } from '../../../../../store/createCart/CreateCartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchDataCanceledUser } from '../../../../../store/canceled/CanceledUser'
import { PaymentOrder } from '../../../../../store/thanhtoan/PaymentOrder'
import { CreateQR } from '../../../../../store/QRcode/CreateQR'
import { fetchDataBoughtUser, setSubFet } from '../../../../../store/bought/BoughtUser'
import CustomNotification from '../../../../../components/notification/CustomNotifacation'


const CanceledModal = ({ open, setOpen, data, quantityProduct, setData, setQuantityProduct, phone, setPhone, address, setAddress, setTotalAllAmount, totleAllAmount }) => {

    const dispatch = useDispatch()
    const [open3, setOpen3] = useState(false)
    const [fix, setFix] = useState(false)
    const [formData, setFormData] = useState()
    const [showQRCode, setShowQRCode] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const loadingCreate = useSelector(state => state.statusCanceled.loadingCreateOrder)
    const nav = useNavigate()
    const subDele = useSelector(state => state.statusCanceled.subDeleteOrder)
    const [methodPayment, setMethodPayment] = useState(1);
    const qr = useSelector(state => state.createQR.data)
    const subCreateOrder = useSelector(state => state.statusCanceled.subCreateOrder)
    const errorCreateOrder = useSelector(state => state.statusCanceled.errorCreateOrder)
    const dataBought = useSelector((state) => state.bought.data);
    const subFet = useSelector((state) => state.bought.sub);


    const onChange1 = (e) => {
        setMethodPayment(e.target.value);
        console.log(e.target.value);
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


    const totalAmountProduct = (amount, quantity) => {
        return amount * quantity
    }

    const handleUp = (index) => {
        const datanew = [...quantityProduct];
        datanew[index].quantity = datanew[index].quantity + 1;
        setQuantityProduct(datanew);
    };

    const handleDown = (index) => {
        const datanew = [...quantityProduct];
        if (datanew[index].quantity > 1) {
            datanew[index].quantity = datanew[index].quantity - 1;
            setQuantityProduct(datanew);
        } else {
            Modal.confirm({
                title: 'Xác nhận xóa',
                content: 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách không?',
                okText: 'Xóa',
                cancelText: 'Hủy',
                onOk: () => handleDelete(index),
            });
        }
    };

    const handleDelete = (index) => {
        const updatedProductList = data.productList.filter((_, i) => i !== index);
        setData(prevData => ({
            ...prevData,
            productList: updatedProductList,
        }));
        const updatedQuantityProduct = quantityProduct.filter((_, i) => i !== index);
        setQuantityProduct(updatedQuantityProduct);

    };



    const handleBuy = () => {
        dispatch(CreateOrder(formData))
    }
    console.log('methodPayment', methodPayment);

    useEffect(() => {

        if (subCreateOrder) {
            dispatch(fetchDataBoughtUser());
            dispatch(setSubCreate(false))
        }
    }, [subCreateOrder, dispatch])

    useEffect(() => {
        if (subFet) {
            dispatch(DeleteOrder(data?._id))
            if (methodPayment === 'cash-on-delivery') {
                dispatch(PaymentOrder(dataBought[dataBought.length - 1]._id))
                setOpen(false)
            } else {
                setOpen3(true)
                dispatch(CreateQR({ totalAmount: data?.totalAmount }))
            }
            dispatch(setSubFet())
        }
    }, [subFet])

    const onChange = (key) => {
        console.log(key);
    };


    const items = [
        {
            key: '1',
            label:
                <div className='flex justify-between items-center'>
                    <div className='font-bold text-[16px]'>Hình thức thanh toán</div>
                </div>,
            children:
                <>
                    <Radio.Group onChange={onChange1} value={methodPayment}>
                        <Space direction="vertical">
                            <Radio value={'cash-on-delivery'}>Thanh toán khi nhận hàng</Radio>
                            <Radio value={'bank-transfer'}>Chuyển khoản ngân hàng</Radio>
                        </Space>
                    </Radio.Group>
                </>

            ,
        },

    ];


    if (!data) {
        return null;
    }



    return (
        <>
            <CustomNotification
                success={subCreateOrder && 'Mua lại thành công'}
                error={errorCreateOrder}
            />
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
                    <Col span={24}>
                        <hr />
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Collapse
                            onChange={onChange}
                            defaultActiveKey={'1'}
                            ghost
                            expandIconPosition={'end'}
                            items={items}
                            className={styles.customCollapseHeader}
                        />
                    </Col>
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
                open={open3}
                onCancel={() => setOpen3(false)}
                centered
                footer={false}
                closeIcon={false}
            >
                <div className="text-center">
                    <img
                        src={qr.qrUrl}
                        alt=""
                    />
                    <p className="mt-2 text-gray-700">
                        Quét mã QR để thực hiện thanh toán chuyển khoản
                    </p>
                </div>
            </Modal>
        </>
    )
}

export default CanceledModal
