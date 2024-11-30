import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetBill } from '../../../../../store/admin/getBill/GetBill'
import { Button, Space, Table } from 'antd'
import { AiOutlineEdit } from 'react-icons/ai'
import ModalListInventory from './ModalListInventory'

const ListInventory = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.getBill.data)
    useEffect(() => {
        dispatch(GetBill())
    }, [])

    const [open, setOpen] = useState(false)
    const [dataDital, setDataDital] = useState()

    const column = [
        {
            key: 'stt',
            title: 'STT',
            render: (_value, _object, index) => {
                return index + 1
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
            title: 'Đơn giá',
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
                        icon={<AiOutlineEdit size={20} />}
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
                pagination={{ pageSize: 10 }}
            />
            <ModalListInventory open={open} setOpen={setOpen} dataDital={dataDital} />
        </>
    )
}

export default ListInventory
