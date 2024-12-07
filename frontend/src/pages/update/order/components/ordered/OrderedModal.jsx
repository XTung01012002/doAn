import { Col, Image, Modal, Row, Avatar } from 'antd'
import React from 'react'
import styles from '../bought//ButtonStyles.module.css'

const OrderedModal = ({ open, setOpen, data }) => {



    const handleClickCannel = () => {
        setOpen(false)
    }

console.log(data);


    const total = data?.totalAmount
    if (!data || !data.productList) {
        return null;
    }

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
                        <div className="flex justify-between items-center">
                            <div className="mb-5 font-bold text-[16px]">
                                Thông tin khách hàng
                            </div>

                        </div>
                        <Row gutter={[8, 12]}>
                            <Col className="gutter-row" span={24}>
                                <Row gutter={[8, 12]}>
                                    <Col className="gutter-row" span={24}>
                                        <Row gutter={[8, 12]}>
                                            <Col className="gutter-row" span={4}>
                                                Số điện thoại:
                                            </Col>
                                            <Col className="gutter-row" span={20}>
                                                {data?.phone}
                                            </Col>
                                            <Col className="gutter-row" span={4}>
                                                Địa chỉ:
                                            </Col>
                                            <Col className="gutter-row" span={20}>
                                                {data?.address}
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
                                                                            <span className='mr-2 text-[#B0B3B8] line-through'>{item?.productId?.price ? item.productId.price.toLocaleString('vi-VN') : 'N/A'} đ</span>
                                                                            <span className='font-medium'>{item?.productId?.sellingPrice ? item.productId.sellingPrice.toLocaleString('vi-VN') : 'N/A'} đ</span>
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
                                                                        <span className=' ml-1 font-medium'>{totalPriceItem ? totalPriceItem.toLocaleString('vi-VN') : 'N/A'} đ</span>
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
                                {total ? total.toLocaleString('vi-VN') : 'N/A'} đ
                            </Col>
                        </Row>
                    </Col>
                    {/* <Col
                        className='flex justify-end'
                        span={24}
                    >
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
                    </Col> */}
                </Row >
            </Modal >

        </>
    )
}

export default OrderedModal
