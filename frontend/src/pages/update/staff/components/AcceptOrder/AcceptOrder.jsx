import { Button, Image, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import AcceptOderModal from './AcceptOderModal'
import { useDispatch, useSelector } from 'react-redux'
import { IoCheckmarkDone } from "react-icons/io5";
import formatAmount from '../../../../../components/formatNumber/FormatNumber'
import { FetchDataAccept } from '../../../../../store/staff/FetchDataAccept'
import AcceptOrderViewModal from './AcceptOrderViewModal';
import { FaRegEye } from 'react-icons/fa';

const AcceptOrder = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const dataSource = useSelector(state => state.fetchAccept.data)
    useEffect(() => {
        dispatch(FetchDataAccept());
    }, [dispatch]);

    console.log('abac', dataSource);


    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;


    const column = [
        {
            key: 'stt',
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
            key: 'productImages',
            dataIndex: 'productList',
            title: 'Hình ảnh',
            render: (productList) => {
                const firstImage = productList[0].productId?.productImage?.[0];
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
            key: 'action',
            title: 'Hành động',
            render: (_value, data) => {
                return (
                    <Button
                        color='default'
                        variant='text'
                        onClick={() => { setId(data); setOpen(true) }}
                    >
                        <FaRegEye
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
            <div className='mb-2 text-[18px] font-bold'>
                Danh sách đơn hàng chưa duyệt
            </div>
            <Table
                columns={column}
                dataSource={dataSource}
                pagination={{
                    pageSize: pageSize,
                    current: currentPage,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
            <AcceptOrderViewModal open={open} setOpen={setOpen} data={id} />
        </div>
    )
}

export default AcceptOrder
