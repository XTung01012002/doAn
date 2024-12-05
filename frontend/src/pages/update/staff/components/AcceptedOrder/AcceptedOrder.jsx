import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllInfoShipOrder } from '../../../../../store/shipinfo/GetAllOrderShipInfo';
import { Button, Table, Tag } from 'antd';
import formatAmount from '../../../../../components/formatNumber/FormatNumber';
import { MdOutlineRemoveRedEye } from "react-icons/md";




const AcceptedOrder = () => {

    const dispatch = useDispatch();
    const dataSource = useSelector(state => state.getAllShipInfo.data)
    useEffect(() => {
        dispatch(GetAllInfoShipOrder())
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;


console.log('ádasd', dataSource);

    const column = [
        {
            key: '_id',
            dataIndex: '_id',
            title: 'STT',
            render: (_text, _record, index) => {
                return (currentPage - 1) * pageSize + index + 1
            }
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày tạo',
            render: (createdAt) => {
                return createdAt ? new Date(createdAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }) : '';
            }
        },
        {
            key: 'deliveryDate',
            dataIndex: 'deliveryDate',
            title: 'Ngày giao hàng',
            render: (deliveryDate) => {
                return deliveryDate ? new Date(deliveryDate).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }) : '';
            }
        },
        {
            key: 'maVanDon',
            dataIndex: 'maVanDon',
            title: 'Mã vận đơn'
        },
        {
            key: 'shippingMethod',
            dataIndex: 'shippingMethod',
            title: 'Hình thức vận chuyển'
        },
        {
            key: 'paymentInfoStatus',
            dataIndex: 'paymentInfo',
            title: 'Trạng thái thanh toán',
            render: (paymentInfo) => {
                return <Tag bordered={false}
                    color={
                        paymentInfo?.paymentStatus === 'Chưa thanh toán'
                            ? 'error'
                            : paymentInfo?.paymentStatus === 'Đã thanh toán'
                                ? 'blue'
                                : paymentInfo?.paymentStatus === 'thanh toán khi nhận hàng'
                                    ? 'cyan'
                                    : 'error'}
                >
                    {
                        paymentInfo?.paymentStatus
                        ? paymentInfo?.paymentStatus
                        : 'Chưa chọn phương thức thanh toán'
                    }
                </Tag>

            }
        },
        {
            key: 'totalAmount',
            dataIndex: 'totalAmount',
            title: 'Giá tiền',
            render: (totalAmount) => {
                return `${formatAmount(totalAmount)} đ`
            }
        },
        {
            key: 'shippingStatus',
            dataIndex: 'shippingStatus',
            title: 'Trạng thái đơn',
            // render: (totalAmount) => {
            //     return `${formatAmount(totalAmount)} đ`
            // }
        },
    ]

    return (
        <div>
            <Table
                columns={column}
                dataSource={dataSource}
                pagination={{
                    pageSize: pageSize,
                    current: currentPage,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
        </div>
    )
}

export default AcceptedOrder
