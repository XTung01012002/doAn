import { Avatar, Button, Col, Collapse, Image, Modal, Radio, Row, Space } from 'antd';
import React, { useState } from 'react'
import styles from '../bought/ButtonStyles.module.css'


const ModalDelivered = ({ open, setOpen, data }) => {




    const handleClickCannel = () => {
        setOpen(false)
    }
    const onChange = (key) => {
        console.log(key);
    };


    // sửa sang redux
    const [value, setValue] = useState(1);
    const onChange1 = (e) => {
        setValue(e.target.value);
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
    return (
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
                    </div>
                    <Row gutter={[8, 12]}>
                        <Col className='gutter-row' span={24}>
                            <Row gutter={[8, 12]}>
                                <Col className='gutter-row' span={24}>
                                    <Row gutter={[8, 12]}>
                                        <Col className='gutter-row' span={4}>
                                            Số điện thoại:
                                        </Col>
                                        <Col className='gutter-row' span={20}>
                                            {/* {phone} */}
                                        </Col>
                                        <Col className='gutter-row' span={4}>
                                            Địa chỉ:
                                        </Col>
                                        <Col className='gutter-row' span={20}>
                                            {/* {address} */}
                                        </Col>
                                    </Row>
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
                                                                    {/* <span className=' ml-1 font-medium'>{item.toLocaleString('vi-VN')} đ</span> */}
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
                    <div>
                        <div>
                            Hình thức thanh toán
                        </div>
                        <div>
                            {data?.paymentStatus}
                        </div>
                    </div>
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
                            {/* {totleAllAmount && totleAllAmount.toLocaleString('vi-VN')} đ */}
                        </Col>
                    </Row>
                </Col>
                {/* <Col
                    className='flex justify-end'
                    span={24}
                >
                    <Button
                        color='primary'
                        variant='solid'
                    // onClick={handleBuy}
                    >
                        Mua lại
                    </Button>
                </Col> */}
            </Row >
        </Modal >
    )
}

export default ModalDelivered
