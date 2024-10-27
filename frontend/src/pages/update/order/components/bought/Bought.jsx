import React from 'react'
import { BoughtData } from './BoughtData'
import { Avatar, Button, Card, Col, Image, Row } from 'antd'
import styles from '../CustomScrollY.module.css'

const Bought = () => {


    return (
        <div className={styles.customScrollbar}>
            <Row gutter={[16, 24]}>
                {BoughtData?.map((item, index) => {
                    return (
                        <Col className="gutter-row " span={24} key={index}>
                            <Card>
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
                                                                    color={item.status ? 'primary' : 'danger'}
                                                                    variant="solid"
                                                                >
                                                                    {item.status ? 'Đã thanh toán' : 'Chưa thanh toán'}

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

export default Bought
