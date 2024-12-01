import { Button, Image, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import AcceptOderModal from './AcceptOderModal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataBoughtUser } from '../../../../../store/bought/BoughtUser'
import { IoCheckmarkDone } from "react-icons/io5";
import formatAmount from '../../../../../components/formatNumber/FormatNumber'

const AcceptOrder = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const dataSource = useSelector(state => state.bought.data)
    useEffect(() => {
        dispatch(fetchDataBoughtUser());
    }, [dispatch]);

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
            key: 'productImages',
            dataIndex: 'productList',
            title: 'Hình ảnh',
            render: (productList) => {
                const firstImage = productList.productId?.productImage?.[0];
                console.log('Status  firstImage', firstImage);
                return (
                    <div>

                        {firstImage ? (
                            <Image
                                key={firstImage}
                                src={firstImage}
                                alt="Product Image"
                                width={50}
                                height={50}
                                style={{ marginRight: 8 }}
                            />
                        ) : (
                            <span key={firstImage}>No Image</span>
                        )}
                    </div>
                );
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
            key: 'quantity',
            dataIndex: 'productList',
            title: 'Số lượng',
            render: (productList) => {
                const totalQuantity = productList?.reduce((sum, product) => sum + product.quantity, 0);
                return totalQuantity;
            }
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
            key: 'paymentStatus',
            dataIndex: 'paymentStatus',
            title: 'Thanh toán'
        },
        {
            key: 'status',
            dataIndex: 'orderStatus',
            title: 'Đơn hàng'
        },
        {
            key: 'action',
            title: 'Hành động',
            render: (_value, data) => {
                return (
                    <Button
                        color='default'
                        variant='text'
                        onClick={() => { setId(data._id); setOpen(true) }}
                    >
                        <IoCheckmarkDone
                            color='blue'
                            size={20}
                        />
                    </Button>
                )
            }
        }

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

            <AcceptOderModal open={open} setOpen={setOpen} id={id} />
        </div>
    )
}

export default AcceptOrder
