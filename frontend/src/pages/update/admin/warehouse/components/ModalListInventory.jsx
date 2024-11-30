import { Col, Divider, Modal, Row, Table } from 'antd'
import React from 'react'
import { format } from 'date-fns';
import formatAmount from '../../../../../components/formatNumber/FormatNumber';




const ModalListInventory = ({ open, setOpen, dataDital }) => {


    const handleClose = () => {
        setOpen(false)
    }

    if (!dataDital) return
    console.log(dataDital);

    const column = [
        {
            title: 'STT',
            render: (_value, _object, index) => {
                return index + 1
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productId',
            key: 'productId',
            render: (productId) => {
                return productId.productName
            }
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'productId',
            key: 'productId',
            render: (productId) => {
                return productId.brandName
            }
        },
        {
            title: 'Danh mục',
            dataIndex: 'productId',
            key: 'productId',
            render: (productId) => {
                return productId.category
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            render: (value) => {
                return `${formatAmount(value)} đ`
            }
        },

    ]


    return (
        <Modal
            open={open}
            onClose={handleClose}
            onCancel={handleClose}
            title={<div className='text-center text-[20px]'>Xem chi tiết</div>}
            footer={false}
            closeIcon={false}
            centered
            width={900}
        >
            <Divider />
            <Row gutter={[16, 24]} justify="center" align="middle">
                <Col className='gutter-row' span={12}>
                    <Row gutter={[16, 24]} justify="center" align="middle">
                        <Col className='gutter-row text-[16px] font-medium' span={8}>
                            Nhà cung cấp:
                        </Col>
                        <Col className='gutter-row text-[16px]' span={16}>
                            {dataDital.supplierName}
                        </Col>
                        <Col className='gutter-row text-[16px] font-medium' span={8}>
                            Người giao hàng:
                        </Col>
                        <Col className='gutter-row text-[16px]' span={16}>
                            {dataDital.deliveryPerson}
                        </Col>
                        <Col className='gutter-row text-[16px] font-medium' span={8}>
                            Ngày tạo:
                        </Col>
                        <Col className='gutter-row text-[16px]' span={16}>
                            {format(new Date(dataDital.createdAt), 'dd-MM-yyyy')}
                        </Col>
                    </Row>
                </Col>
                <Col className='gutter-row' span={12}>
                    <Row gutter={[16, 24]} justify="center" align="middle">
                        <Col className='gutter-row text-[16px] font-medium' span={8}>
                            Địa chỉ:
                        </Col>
                        <Col className='gutter-row text-[16px]' span={16}>
                            {dataDital.address}
                        </Col>
                        <Col className='gutter-row text-[16px] font-medium' span={8}>
                            Số điện thoại:
                        </Col>
                        <Col className='gutter-row text-[16px]' span={16}>
                            {dataDital.phoneNumber}
                        </Col>
                        <Col className='gutter-row text-[16px] font-medium' span={8}>
                            Tổng tiền:
                        </Col>
                        <Col className='gutter-row text-[16px]' span={16}>
                            {formatAmount(dataDital.totalAmount)} đ
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider />
            <p className='text-[16px] font-medium'>Danh sách sản phẩm</p>
            <Table
                dataSource={dataDital.productList}
                columns={column}
                pagination={{pageSize: 4}}
            />
        </Modal>
    )
}

export default ModalListInventory
