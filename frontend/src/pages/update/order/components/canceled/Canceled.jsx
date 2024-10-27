import React from 'react'
import { CanceledData } from './CanceledData'
import { Avatar, Button, Card, Col, Image, Row } from 'antd'
import styles from '../CustomScrollY.module.css'

const Canceled = () => {
    return (
        <div className={styles.customScrollbar}>
            <Row gutter={[16, 24]}>
                {CanceledData?.map((item, index) => {
                    return (
                        <Col className="gutter-row " span={24} key={index}>
                            <Card
                                className='relative'
                            >
                                <div className='absolute z-50 right-6 top-2 text-[16px] font-bold text-[#D42828]'>
                                    Đã hủy
                                </div>
                                <Row gutter={[16, 24]}>
                                    <Col className='gutter-row' span={6}>
                                        <Avatar
                                            shape="square"
                                            size={150}
                                            icon={
                                                <Image
                                                    src={item.img}
                                                />
                                            }
                                        />
                                    </Col>
                                    {/* <Col className='gutter-row' span={18}>
                                        <Row gutter={[16, 24]} className='flex items-center'>
                                            <Col className='gutter-row' span={12} >
                                                <Row gutter={[16, 24]}>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center'>
                                                            <Col className='gutter-row' span={8}>
                                                                <span className='text-[16px] font-medium'>Tên</span>
                                                            </Col>
                                                            <Col className='gutter-row' span={16}>
                                                                :  <span className='text-[16px]'>{item.name}</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center'>
                                                            <Col className='gutter-row' span={8}>
                                                                <span className='text-[16px] font-medium'>Giá</span>
                                                            </Col>
                                                            <Col className='gutter-row' span={16}>
                                                                :  <span className='text-[16px]'>{item.price.toLocaleString('vi-VN')} đ</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center'>
                                                            <Col className='gutter-row' span={8}>
                                                                <span className='text-[16px] font-medium'>Số lượng</span>
                                                            </Col>
                                                            <Col className='gutter-row' span={16}>
                                                                :   <span className='text-[16px]'>{item.quantity}</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className='gutter-row' span={12} >
                                                <Row gutter={[16, 24]}>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                                            <Col className='gutter-row flex items-center justify-end' span={24}>
                                                                <span className='text-[16px] font-medium'>Thành tiền</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                                            <Col className='gutter-row flex items-center justify-end' span={24} >
                                                                <span className='text-[16px]'>{item.total.toLocaleString('vi-VN')} đ</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                                            <Col className='gutter-row flex items-center justify-end' span={24} >
                                                                <Button
                                                                    color='danger'
                                                                    variant="solid"
                                                                >
                                                                    Mua lại

                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col> */}
                                    <Col className='gutter-row' span={18}>
                                        <Row gutter={[16, 24]} className='flex items-center'>
                                            <Col className='gutter-row' span={24} >
                                                <Row gutter={[16, 24]}>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center'>
                                                            <Col className='gutter-row' span={24}>
                                                                <span className='text-[16px]'>{item.name}</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center'>
                                                            <Col className='gutter-row' span={12}>
                                                                <span className='text-[16px]'>{item.price.toLocaleString('vi-VN')} đ</span>
                                                            </Col>
                                                            <Col className='gutter-row flex justify-end' span={12}>
                                                                <span className='text-[16px]'>x {' '}{item.quantity}</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className='gutter-row' span={24} >
                                                <Row gutter={[16, 24]}>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                                            <Col className='gutter-row flex items-center justify-end' span={24}>
                                                                <span className='text-[16px] '>{item.quantity} mặt hàng: </span> <span className='text-[16px] ml-1 font-medium'>{item.total.toLocaleString('vi-VN')} đ</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                                            <Col className='gutter-row flex items-center justify-end' span={24} >
                                                                <Button
                                                                    color='primary'
                                                                    variant="solid"
                                                                >
                                                                    Mua lại

                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Canceled
