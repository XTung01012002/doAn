import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllCancelOrderSale } from '../../../../../store/getAllCancelOrderSale/GetAllCancelOrderSale';
import { Table, Tag } from 'antd';
import formatAmount from '../../../../../components/formatNumber/FormatNumber';





const AppCanceledSale = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.getAllCancelSale.data)

    useEffect(() => {
        dispatch(GetAllCancelOrderSale())
    }, [dispatch])
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;

    const column = [
        {
            key: 'stt',
            title: 'STT',
            render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1,
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
            key: 'name',
            dataIndex: 'userId',
            title: 'Tên khách hàng',
            render: (userId) => {
                return `${userId.name}`
            }
        },
        {
            key: 'phone',
            dataIndex: 'phone',
            title: 'Số điện thoại'
        },
        {
            key: 'address',
            dataIndex: 'address',
            title: 'Địa chỉ'
        },
        {
            key: 'totalAmount',
            dataIndex: 'totalAmount',
            title: 'Tổng tiền',
            render: (value) => {
                return `${formatAmount(value)} VNĐ`
            }
        },
        {
            key: 'status',
            dataIndex: 'orderStatus',
            title: 'Đơn hàng',
            render: (value) => {
                return <Tag bordered={false} color="error">{value}</Tag>
            }
        },
    ]

    return (
        <Table
            dataSource={data}
            columns={column}
            pagination={{
                pageSize: pageSize,
                current: currentPage,
                onChange: (page) => setCurrentPage(page),
            }}
        />
    )
}

export default AppCanceledSale
