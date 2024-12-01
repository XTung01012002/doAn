
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllUserAdmin } from '../../../../../store/admin/PageAdmin/getAllUser'
import { format } from 'date-fns'
import { Button, Table } from 'antd'
import ChangeUserRole from '../../../../../components/ChangeUserRole'
import { AiOutlineEdit } from 'react-icons/ai'

const AllUserAdmin = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.getAllUserAdmin.data)

    const [open, setOpen] = useState(false)

    const [dataSelect, setDataSelect] = useState()

    useEffect(() => {
        dispatch(GetAllUserAdmin())
    }, [dispatch])


    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;

    const column = [
        {
            title: 'STT',
            render: (_text, _record, index) => {
                return (currentPage - 1) * pageSize + index + 1
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value) => {
                return format(new Date(value), 'dd-MM-yyyy')
            }
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Hành động',
            align: 'center',
            render: (_, data) => {
                return (
                    <Button
                        variant='text'
                        className='border-none '
                        color='primary'
                        shape="circle"
                        icon={<AiOutlineEdit size={20} />}
                        onClick={() => { setOpen(true); setDataSelect(data) }}
                    />
                )
            }
        }
    ]

    return (
        <>
            <Table
                dataSource={data}
                columns={column}
                pagination={{
                    pageSize: pageSize,
                    current: currentPage,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
            {open && (
                <ChangeUserRole
                    onClose={() => setOpen(false)}
                    name={dataSelect.name}
                    email={dataSelect.email}
                    role={dataSelect.role}
                    userId={dataSelect._id}
                />
            )}
        </>
    )
}

export default AllUserAdmin
