import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Col, Image, Row } from 'antd'
import styles from '../CustomScrollY.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetDelivered } from '../../../../../store/delivered/Delivered'
import ModalDelivered from './ModalDelivered'
import { format } from 'date-fns'




const Delivered = () => {

    const dispatch = useDispatch()
    const [expandedIndices, setExpandedIndices] = useState([]);
    const data = useSelector(state => state.getDeliver.data)
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
    console.log('asd,', data);

    const [dataDetal, setDatadetal] = useState()
    const [open, setOpen] = useState(false)

    const handleBuyed = (items) => {
        setOpen(true)
        setDatadetal(items)
    }
    useEffect(() => {
        dispatch(GetDelivered())
    }, [dispatch])

    return (
        <div className={styles.customScrollbar}>
            <Row gutter={[16, 24]}>
                {data?.map((items, index) => {
                    const isExpanded = expandedIndices[index];
                    const displayItems = isExpanded ? items.paymentInfo.productList : [items.paymentInfo.productList[0]];

                    return (
                        <Col className="gutter-row" span={24} key={index}>

                            <Card
                                className='relative'
                                title={
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <span className='font-medium mr-2'>Mã vận đơn: </span>{items.maVanDon}
                                        </div>
                                        <div>
                                            <span className='font-medium mr-2'>Ngày nhận dự kiến: </span>{format(new Date(items.deliveryDate), 'dd-MM-yyyy')}
                                        </div>
                                    </div>
                                }
                            >
                                <span
                                    className='absolute right-6 top-4 text-[16px] font-semibold text-[#3145f7]'
                                >
                                    {items.orderStatus}
                                </span>
                                {displayItems?.map((item, itemIndex) => {
                                    const totalPriceItem = item.productId?.sellingPrice * item.quantity;

                                    return (
                                        <Row gutter={[16, 24]} key={itemIndex} className='mb-4'>
                                            <Col className='gutter-row flex justify-center items-center' span={6}>
                                                <Avatar
                                                    shape="square"
                                                    size={150}
                                                    icon={<Image src={item.productId?.productImage[0]} />}
                                                />
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
                                            onClick={() => handleBuyed(items)}
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </Col>
                                </Row>

                                {items.paymentInfo.productList.length > 1 &&
                                    <div className="flex items-center justify-center mt-4">
                                        <div className="w-1/4 border-t border-gray-300"></div>
                                        <div className="mx-4 text-center">
                                            {items?.productList?.length > 1 && !isExpanded && (
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
            <ModalDelivered open={open} setOpen={setOpen} data={dataDetal} />
        </div>
    )
}

export default Delivered
