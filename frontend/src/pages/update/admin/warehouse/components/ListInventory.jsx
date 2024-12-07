import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetBill } from '../../../../../store/admin/getBill/GetBill'
import { Button, Space, Table } from 'antd'
import { FaRegEye } from "react-icons/fa";
import ModalListInventory from './ModalListInventory'

const ListInventory = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.getBill.data)
    useEffect(() => {
        dispatch(GetBill())
    }, [])

    const [open, setOpen] = useState(false)
    const [dataDital, setDataDital] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;
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
            key: 'supplierName',
            dataIndex: 'supplierName',
            title: 'Nhà cung cấp'
        },
        {
            key: 'address',
            dataIndex: 'address',
            title: 'Địa chỉ'
        },
        {
            key: 'deliveryPerson',
            dataIndex: 'deliveryPerson',
            title: 'Người giao hàng'
        },
        {
            key: 'phoneNumber',
            dataIndex: 'phoneNumber',
            title: 'Số điện thoại'
        },
        {
            key: 'totalAmount',
            dataIndex: 'totalAmount',
            title: 'Tổng tiền',
            render: (value) => {
                if (typeof value === 'number') {
                    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
                return value;
            }
        },
        {
            key: 'action',
            dataIndex: 'action',
            title: 'Hành động',
            align: 'center',
            render: (_, object) => {
                return (
                    <Button
                        variant='text'
                        className='border-none '
                        color='primary'
                        shape="circle"
                        icon={<FaRegEye size={20} />}
                        onClick={() => { setOpen(true); setDataDital(object) }}
                    />
                )
            }
        }
    ]


    return (
        <>
            <Table
                columns={column}
                dataSource={data}
                pagination={{
                    pageSize: pageSize,
                    current: currentPage,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
            <ModalListInventory open={open} setOpen={setOpen} dataDital={dataDital} />
        </>
    )
}

export default ListInventory
