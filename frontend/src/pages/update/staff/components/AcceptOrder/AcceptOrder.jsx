import { Button, Image, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import AcceptOderModal from './AcceptOderModal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataBoughtUser } from '../../../../../store/bought/BoughtUser'
import { IoCheckmarkDone } from "react-icons/io5";

const AcceptOrder = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const dataSource = useSelector(state => state.bought.data)
    useEffect(() => {
        dispatch(fetchDataBoughtUser());
    }, [dispatch]);


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
            dataIndex: '',
            title: 'Tên khách hàng'
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
            title: 'Tổng tiền'
        },
        {
            key: 'paymentStatus',
            dataIndex: 'paymentStatus',
            title: 'Trạng thái thanh toán'
        },
        {
            key: 'status',
            dataIndex: 'orderStatus',
            title: 'Trạng thái đơn hàng'
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
                
            />

            <AcceptOderModal open={open} setOpen={setOpen} id={id} />
        </div>
    )
}

export default AcceptOrder
