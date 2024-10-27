import React from 'react'
import { Avatar, Button, Card, Col, Image, Rate, Row } from 'antd'
import styles from '../CustomScrollY.module.css'
import { RateData } from './RateData';

const actions = [
    <div></div>,
    <div></div>,
    <div key='check'>
        <span className='mr-2'>Đánh giá nhanh</span>
        <Rate />
    </div>,

];

const Rates = () => {
    return (
        <div className={styles.customScrollbar}>
            <Row gutter={[16, 24]}>
                {RateData?.map((item, index) => {
                    return (
                        <Col className="gutter-row " span={24} key={index}>
                            <Card
                                title={`Nhận đơn ngày:  ${item.dayEnd}`}
                                bordered={false}
                                actions={actions}
                            >
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
                                                                    color='default'
                                                                    variant="outlined"
                                                                    className='mr-2'
                                                                >
                                                                    Mua lại
                                                                </Button>
                                                                <Button
                                                                    color='primary'
                                                                    variant="solid"
                                                                >
                                                                    Viết đánh giá
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

export default Rates
