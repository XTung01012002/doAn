/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Dropdown, Image, Row, Space } from 'antd';
import styles from '../CustomScrollY.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataBoughtUser } from '../../../../../store/bought/BoughtUser';
import BoughtModal from './BoughtModal';



const Bought = () => {
    const [expandedIndices, setExpandedIndices] = useState([]);
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();
    const data = useSelector((state) => state.bought.data);

    const [dataModal, setDataModal] = useState(null);

    useEffect(() => {
        dispatch(fetchDataBoughtUser());
    }, [dispatch]);
    console.log(dataModal);

    const toggleExpanded = (index) => {
        setExpandedIndices((prev) => {
            const newIndices = [...prev];
            if (newIndices[index]) {
                newIndices[index] = false;
            } else {
                newIndices[index] = true;
            }
            return newIndices;
        });
    };

    return (
        <div className={`${styles.customScrollbar}`}>
            <Row gutter={[16, 24]}>
                {data?.map((items, index) => {
                    const isExpanded = expandedIndices[index];
                    const displayItems = isExpanded ? items.productList : [items.productList[0]];
                    console.log('displayIems', items.productList.length);

                    return (
                        <Col className="gutter-row" span={24} key={index}>
                            <Card
                                className='relative'
                            >
                                <span
                                    className='absolute right-6 top-4 text-[16px] font-semibold text-[#ff4242]'
                                >
                                    {items.paymentStatus}
                                </span>
                                {displayItems?.map((item, itemIndex) => {
                                    const totalPriceItem = item.productId?.sellingPrice * item.quantity;

                                    return (
                                        <Row gutter={[16, 24]} key={itemIndex} className='mb-4'>
                                            <Col className='gutter-row flex justify-center items-center' span={6}>
                                                {/* <Avatar
                                                    shape="square"
                                                    size={150}
                                                    icon={<Image src={item.productId?.productImage[0]} />}
                                                /> */}
                                            </Col>
                                            <Col className='gutter-row' span={18}>
                                                <Row gutter={[16, 24]} className='flex items-center'>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]}>
                                                            <Col className='gutter-row' span={24}>
                                                                <Row gutter={[16, 24]} className='flex items-center'>
                                                                    <Col className='gutter-row' span={24}>
                                                                        <span className='font-medium'>{item.productId?.productName}</span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col className='gutter-row' span={24}>
                                                                <Row gutter={[16, 24]} className='flex items-center'>
                                                                    <Col className='gutter-row' span={12}>
                                                                        <div>
                                                                            <span className='mr-2 text-[#B0B3B8] line-through'>{item.productId?.price.toLocaleString('vi-VN')} đ</span>
                                                                            <span className='font-medium'>{item.productId?.sellingPrice.toLocaleString('vi-VN')} đ</span>
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
                                                                        <span className='ml-1 font-medium'>{totalPriceItem.toLocaleString('vi-VN')} đ</span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    );
                                })}
                                <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                    <Col className='gutter-row flex items-center justify-end' span={24}>
                                        <span className=''>Tổng tiền: </span>
                                        <span className=' ml-1 font-medium'>{items.totalAmount.toLocaleString('vi-VN')} đ</span>
                                    </Col>
                                </Row>

                                <Row gutter={[16, 24]} className='flex mt-4 items-center justify-end'>
                                    <Col className='gutter-row flex items-center justify-end' span={24}>
                                        <Button
                                            variant='solid'
                                            color='primary'
                                            className='mr-2'
                                            onClick={() => { setOpen(true); setDataModal(items) }}
                                        >
                                            Xem chi tiết
                                        </Button>
                                        <Button
                                            variant='solid'
                                            color='danger'
                                        >
                                            Thanh toán ngay
                                        </Button>
                                    </Col>
                                </Row>

                                {items.productList.length > 1 &&
                                    <div className="flex items-center justify-center mt-4">
                                        <div className="w-1/4 border-t border-gray-300"></div>
                                        <div className="mx-4 text-center">
                                            {items.productList.length > 1 && !isExpanded && (
                                                <Row className="">
                                                    <Button
                                                        className={styles.noHover}
                                                        color="default"
                                                        variant="text"
                                                        onClick={() => toggleExpanded(index)}
                                                    >
                                                        Xem thêm
                                                    </Button>
                                                </Row>
                                            )}
                                            {isExpanded && (
                                                <Row className="">
                                                    <Button
                                                        className={styles.noHover}
                                                        color="default"
                                                        variant="text"
                                                        onClick={() => toggleExpanded(index)}
                                                    >
                                                        Thu gọn
                                                    </Button>
                                                </Row>
                                            )}
                                        </div>
                                        <div className="w-1/4 border-t border-gray-300"></div>
                                    </div>
                                }
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <BoughtModal
                open={open}
                setOpen={setOpen}
                data={dataModal}
            />

        </div>
    );
};

export default Bought;
