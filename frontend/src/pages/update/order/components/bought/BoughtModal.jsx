import { Col, Image, Modal, Row, Avatar, Card, Button, Collapse, Select, Radio, Space, Input, Typography } from 'antd'
import React, { useState } from 'react'
import styles from './ButtonStyles.module.css'


const BoughtModal = ({ open, setOpen, data }) => {


    console.log(data);


    const [value, setValue] = useState(1);
    const [fix, setFix] = useState(false)

    const onChange1 = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    console.log('dataa', data);
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

    const items = [
        {
            key: '1',
            label: <div className='font-bold text-[16px]'>Hình thức thanh toán</div>,
            children:
                <>
                    <Radio.Group onChange={onChange1} value={value}>
                        <Space direction="vertical">
                            <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                            <Radio value={2}>Chuyển khoản ngân hàng</Radio>
                        </Space>
                    </Radio.Group>
                    {value === 2 &&
                        <img
                            src="https://img.vietqr.io/image/TCB-19037144050012-compact.png"
                            alt="QR Code"
                            width="256"
                            height="256"
                            className="mx-auto"
                        />
                    }
                </>

            ,
        },

    ];

    // const vt = 24000

    const total = data?.totalAmount 

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
                            {/* <Col className='gutter-row' span={24}>
                                Vận chuyển
                            </Col> */}
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
                    <Col span={24}>
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
                    </Col>
                    <Col span={24}>
                        <hr />
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <div className='flex justify-between'>
                            <div className='mb-5 font-bold text-[16px]'>
                                Thanh toán
                            </div>
                            <div
                                className="mb-5 font-bold"
                                style={{
                                    color: data.paymentStatus === 'Chưa thanh toán' ? '#FF4D4F' : '#3BD80D',
                                }}
                            >
                                {data.paymentStatus}
                            </div>
                        </div>
                        <Row gutter={[16, 24]}>
                            {/* <Col className='gutter-row' span={12}>
                                Tổng tiền sản phẩm:
                            </Col>
                            <Col className='gutter-row flex justify-end font-medium' span={12}>
                                {data?.totalAmount.toLocaleString('vi-VN')} đ
                            </Col> */}
                          
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
                            variant='solid'
                            className='mr-2'
                        >
                            Hủy đơn
                        </Button>
                        <Button
                            color='primary'
                            variant='solid'
                        >
                            Thanh toán ngay
                        </Button>
                    </Col>
                </Row >
            </Modal >

        </>
    )
}

export default BoughtModal
