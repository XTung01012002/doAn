import { Col, Image, Modal, Row, Avatar, Card, Button, Collapse, Select, Radio, Space, Input, Typography, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './ButtonStyles.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataBoughtUser } from '../../../../../store/bought/BoughtUser';
import { putCancelOrder, setErrorPut, setSubPut } from '../../../../../store/bought/PutCancelOrder';
import { PaymentOrder, setErrorNhanhang, setSubNhanhang } from '../../../../../store/thanhtoan/PaymentOrder';
import { CreateQR } from '../../../../../store/QRcode/CreateQR';
import { fetchDataCanceledUser } from '../../../../../store/canceled/CanceledUser';
import CustomNotification from '../../../../../components/notification/CustomNotifacation';
import { PutInfoOrder, setErrorPutInfo, setSubPutInfo } from '../../../../../store/bought/putInfoOrder';

const BoughtModal = ({ open, setOpen, data }) => {

    const [open1, setOpen1] = useState(false)
    const [methodPayment, setMethodPayment] = useState(1);
    const [fix, setFix] = useState(false)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.statusPutCancel.loadingPut)
    const sub = useSelector(state => state.statusPutCancel.subPut)
    const error = useSelector(state => state.statusPutCancel.errorPut)

    const [form] = Form.useForm()

    const loadingCreateNhanHang = useSelector(state => state.nhanhang.loading)

    const subCreateNhanHang = useSelector(state => state.nhanhang.sub)
    const errorCreateNhanHang = useSelector(state => state.nhanhang.error)

    const [dataNew, setDataNew] = useState()

    const subPutInfo = useSelector(state => state.putInfoOrder.sub)
    const loadingPutInfo = useSelector(state => state.putInfoOrder.loading)
    const errorPutInfo = useSelector(state => state.putInfoOrder.error)

    const qr = useSelector(state => state.createQR.data)

    const handleCancelOrder = () => {
        dispatch(putCancelOrder(data._id))
    }

    const handleCancel = () => {
        Modal.confirm({
            title: 'Xác nhận hủy đơn',
            content: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            centered: true, 
            onOk: () => {
                handleCancelOrder();
            },
            onCancel: () => {
                
            },
        });
    };



    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                phone: data.phone || '',
                address: data.address || ''
            })
            setDataNew({
                phone: data.phone,
                address: data.address
            })
        }
    }, [data])

    useEffect(() => {
        if (error !== null) {
            dispatch(setErrorPut())
            setFix(false)
        }
    }, [dispatch, error])

    useEffect(() => {
        if (errorCreateNhanHang !== null) {
            dispatch(setErrorNhanhang())
            setFix(false)
        }
    }, [dispatch, errorCreateNhanHang])

    useEffect(() => {
        if (sub) {
            setFix(false)
            setOpen(false)
            dispatch(fetchDataBoughtUser());
            dispatch(fetchDataCanceledUser())
            dispatch(setSubPut())
        }
    }, [dispatch, sub])


    useEffect(() => {
        if (subCreateNhanHang) {
            setFix(false)
            setOpen(false)
            dispatch(fetchDataBoughtUser());
            dispatch(setSubNhanhang())
        }
    }, [subCreateNhanHang, dispatch])

    const onChange1 = (e) => {
        setMethodPayment(e.target.value);
    };


    const handleClickCannel = () => {
        setOpen(false)
        setFix(false)
    }

    const onChange = (key) => {
        console.log(key);
    };



    const total = data?.totalAmount

    const handleSubmit = () => {
        if (methodPayment === 'cash-on-delivery') {
            dispatch(PaymentOrder(data._id))
        } else {
            dispatch(CreateQR({ totalAmount: data.totalAmount }))
            setOpen1(true)
        }
    }


    const handleSubmitFix = (values) => {
        dispatch(PutInfoOrder({ id: data._id, data: values }));

    };

    useEffect(() => {
        if (subPutInfo) {
            setDataNew(form.getFieldsValue());

            dispatch(setSubPutInfo())
            setFix(false)
        }
    }, [subPutInfo])

    useEffect(() => {
        if (errorPutInfo) {
            dispatch(setErrorPutInfo())
        }
    }, [errorPutInfo])



    if (!data) {
        return null;
    }

    const items = [
        {
            key: '1',
            label:
                <div className='flex justify-between items-center'>
                    <div className='font-bold text-[16px]'>Hình thức thanh toán</div>
                    <div className='font-medium text-[14px] text-[#FF4D4F]'>{data.paymentStatus}</div>
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

    return (
        <>
            <CustomNotification
                success={sub && 'Hủy đơn thành công'}
                error={error}
            />

            <CustomNotification
                success={subCreateNhanHang && 'Thay đổi thành công'}
                error={errorCreateNhanHang}
            />

            <CustomNotification
                success={subPutInfo && 'Cập nhật thành công'}
                error={errorPutInfo}
            />

            <Modal
                title={
                    <div className='text-center font-bold text-[18px]'>
                        Chi tiết đơn hàng
                        <hr className='mt-1' />
                    </div>
                }
                open={open}
                // onOk={handleClickOK}
                onCancel={handleClickCannel}
                centered
                width={700}
                footer={false}
            >
                <Row
                    gutter={[16, 24]}
                    className={styles.customScrollbarY}
                >

                    <Col className="gutter-row" span={24}>

                        <Form
                            form={form}
                            name="basic"
                            onFinish={handleSubmitFix}
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <div className="mb-5 font-bold text-[16px]">
                                    Thông tin khách hàng
                                </div>
                                <div>
                                    {fix ?
                                        <Button
                                            htmlType='submit'
                                            type="primary"
                                            loading={loadingPutInfo}
                                        >
                                            Lưu
                                        </Button>
                                        :
                                        <Button
                                            onClick={(e) => { e.preventDefault(); setFix(!fix) }}
                                            type="primary"
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    }
                                </div>
                            </div>

                            <Row gutter={[8, 12]}>
                                <Col className="gutter-row" span={24}>
                                    <Row gutter={[8, 12]}>
                                        <Col className="gutter-row" span={24}>
                                            {fix ? (
                                                <Row gutter={[8, 12]}>
                                                    <Col className="gutter-row" span={24}>
                                                        <Form.Item
                                                            label="Số điện thoại"
                                                            name="phone"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Vui lòng nhập số điện thoại!',
                                                                },
                                                                {
                                                                    pattern: /^[0-9]{10}$/,
                                                                    message: 'Số điện thoại phải có 10 chữ số!',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Nhập số điện thoại . . ." />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Địa chỉ"
                                                            name="address"
                                                            rules={[
                                                                { required: true, message: 'Vui lòng nhập địa chỉ!' },
                                                            ]}
                                                        >
                                                            <Input placeholder="Nhập địa chỉ . . ." />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <Row gutter={[8, 12]}>
                                                    <Col className="gutter-row" span={4}>
                                                        Số điện thoại:
                                                    </Col>
                                                    <Col className="gutter-row" span={20}>
                                                        {dataNew?.phone}
                                                    </Col>
                                                    <Col className="gutter-row" span={4}>
                                                        Địa chỉ:
                                                    </Col>
                                                    <Col className="gutter-row" span={20}>
                                                        {dataNew?.address}
                                                    </Col>
                                                </Row>
                                            )}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>


                        </Form>

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
                    <Col span={24}>
                        <hr />
                    </Col>
                    <Col className="gutter-row" span={24}>
                        {data.paymentStatus === 'Chưa chọn phương thức thanh toán' ?
                            <Collapse
                                onChange={onChange}
                                defaultActiveKey={'1'}
                                ghost
                                expandIconPosition={'end'}
                                items={items}
                                className={styles.customCollapseHeader}
                            />
                            :
                            <div className='flex justify-between items-center'>
                                <div className='font-bold text-[16px]'>
                                    Hình thức thanh toán
                                </div>
                                <div
                                    className="font-medium"
                                    style={{
                                        color: '#3538fa',
                                    }}
                                >
                                    {data.paymentStatus}
                                </div>
                            </div>
                        }
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
                                {total.toLocaleString('vi-VN')} đ
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        className='flex justify-end'
                        span={24}
                    >
                        <Button
                            color='danger'
                            variant='filled'
                            className='mr-2'
                            onClick={handleCancel}
                            loading={loading}
                        >
                            Hủy đơn
                        </Button>
                        {data.paymentStatus === 'Chưa chọn phương thức thanh toán' &&
                            <Button
                                color='danger'
                                variant='solid'
                                onClick={handleSubmit}
                                loading={(loadingCreateNhanHang) ? true : false}
                            >
                                Thanh toán ngay
                            </Button>
                        }
                    </Col>
                </Row >
            </Modal >
            <Modal
                open={open1}
                onCancel={() => setOpen1(false)}
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

export default BoughtModal
