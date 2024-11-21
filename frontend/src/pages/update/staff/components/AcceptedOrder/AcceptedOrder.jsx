import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllInfoShipOrder } from '../../../../../store/shipinfo/GetAllOrderShipInfo';
import { Button, Table } from 'antd';
import formatAmount from '../../../../../components/formatNumber/FormatNumber';
import { MdOutlineRemoveRedEye } from "react-icons/md";




const AcceptedOrder = () => {

    const dispatch = useDispatch();
    const dataSource = useSelector(state => state.getAllShipInfo.data)
    const [id, setId] = useState(null)
    useEffect(() => {
        dispatch(GetAllInfoShipOrder())
    }, [dispatch])

    console.log('dataSource', dataSource);

    const column = [
        {
            key: '_id',
            dataIndex: '_id',
            title: 'ID',
            render: (text) => (
                <span className="truncate block max-w-[100px]">{text.length > 15 ? `${text.slice(0, 15)}...` : text}</span>
            ),
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
                return paymentInfo.paymentStatus
            }
        },
        {
            key: 'totalAmount',
            dataIndex: 'totalAmount',
            title: 'Giá tiền',
            render: (totalAmount) => {
                return `${formatAmount(totalAmount)} VNĐ`
            }
        },
        {
            key: 'action',
            dataIndex: 'action',
            title: 'Xem chi tiết',
            render: (_value, data) => {
                return (
                    <Button
                        variant='text'
                        color='default'
                        onClick={() => setId(data._id)}
                    >
                        <MdOutlineRemoveRedEye
                            color='blue'
                            size={20}
                        />
                    </Button>
                )
            }
        }
    ]

    return (
        <Table
            columns={column}
            dataSource={dataSource}
            pagination={{ pageSize: 10 }}
        />
    )
}

export default AcceptedOrder