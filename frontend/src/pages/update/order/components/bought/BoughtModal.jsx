import { Col, Image, Modal, Row, Avatar, Card, Button, Collapse, Select } from 'antd'
import React from 'react'
import styles from './ButtonStyles.module.css'


const BoughtModal = ({ open, setOpen, data }) => {


    const handleClickOK = () => {
        setOpen(false)
    }

    const handleClickCannel = () => {
        setOpen(false)
    }

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: <div className='font-bold text-[16px]'>Hình thức thanh toán</div>,
            children: <div>hello world</div>,
        },

    ];

    const vt = 24000

    const total = data?.totalAmount + vt

    return (
        <Modal
            title={
                <div className='text-center'>
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
                    <div className='mb-5 font-bold text-[16px]'>
                        Thông tin khách và vận chuyển
                    </div>
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
                    <div className='mb-5 font-bold text-[16px]'>
                        Thanh toán
                    </div>
                    <Row gutter={[16, 24]}>
                        <Col className='gutter-row' span={12}>
                            Tổng tiền sản phẩm:
                        </Col>
                        <Col className='gutter-row flex justify-end font-medium' span={12}>
                            {data?.totalAmount.toLocaleString('vi-VN')} đ
                        </Col>
                        <Col className='gutter-row' span={12}>
                            Phí vận chuyển:
                        </Col>
                        <Col className='gutter-row flex justify-end font-medium' span={12}>
                            + {vt.toLocaleString('vi-VN')} đ
                        </Col>
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
                        color='primary'
                        variant='solid'
                    >
                        Thanh toán
                    </Button>
                </Col>
            </Row >
        </Modal >
    )
}

export default BoughtModal
