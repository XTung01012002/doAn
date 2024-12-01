import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataWarehouse } from '../../../../../store/admin/warehouse/Warahouse';
import { Button, Image, message, Space, Switch, Table, Tag } from 'antd';
import { CiTrash } from "react-icons/ci";
import EditProductModal from './EditProductModal';
import { AiOutlineEdit } from "react-icons/ai";
import { PutUpdateActive } from '../../../../../store/staff/EditProduct';


const ProductManager = () => {


    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [id, setID] = useState(null)
    const dataSource = useSelector(state => state.warehouse.data)

    const loading = useSelector(state => state.putProductStaff.loading1)
    const sub = useSelector(state => state.putProductStaff.sub1)


    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thành công.',
            duration: 3,
        });
    };




    useEffect(() => {
        dispatch(fetchDataWarehouse())
    }, [dispatch])

    const onChange = (checked, data) => {
        console.log(`switch to ${checked}`);
        dispatch(PutUpdateActive({ id: data._id, data: { active: checked } }))
    };
    useEffect(() => {
        if (sub) {
            success();
            dispatch(fetchDataWarehouse())
        }
    }, [sub])

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const column = [
        {
            key: '_id',
            dataIndex: '_id',
            title: 'ID',
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
            key: 'productImage',
            dataIndex: 'productImage',
            title: 'Ảnh sản phẩm',
            render: (productImage) => {
                return (
                    <div className=''>
                        {productImage.length > 0 ?
                            <Image
                                width={50}
                                height={50}
                                src={productImage[0]}
                            />
                            :
                            <Image
                                width={50}
                                height={50}
                                src=' https://imgs.search.brave.com/jt84d5SmMRH9IYwpquW1be6mriU5QEgM7G1ML6O8rsU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oYXlj/YWZlLnZuL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIzLzA2L0hp/bmgtYW5oLUF2YXRh/ci10cmFuZy10cm9u/LTYwMHg2MDAuanBn'
                            />
                        }
                    </div>
                )
            }
        },
        {
            key: 'productName',
            dataIndex: 'productName',
            title: 'Tên sản phẩm',
            render: (text) => {
                return <span className='truncate block max-w-[100px]'>{text.length > 15 ? `${text.slice(0, 15)}...` : text}</span>
            }
        },
        {
            key: 'category',
            dataIndex: 'category',
            title: 'Danh mục',
            render: (text) => {
                return <span className='truncate block max-w-[100px]'>{text.length > 15 ? `${text.slice(0, 15)}...` : text}</span>
            }
        },
        {
            key: 'brandName',
            dataIndex: 'brandName',
            title: 'Thương hiệu',
            render: (text) => {
                return <span className='truncate block max-w-[100px]'>{text.length > 15 ? `${text.slice(0, 15)}...` : text}</span>
            }
        },
        {
            key: 'priceInventory',
            dataIndex: 'priceInventory',
            title: 'Giá nhập',
            render: (value) => {
                return Intl.NumberFormat('vi-VN').format(value);
            }
        },
        {
            key: 'quantitySold',
            dataIndex: 'quantitySold',
            title: 'Đã bán',
            render: (value) => {
                return Intl.NumberFormat('vi-VN').format(value);
            }
        },
        {
            key: 'quantityInStock',
            dataIndex: 'quantityInStock',
            title: 'Trong kho',
            render: (value) => {
                return Intl.NumberFormat('vi-VN').format(value);
            }
        },
        {
            key: 'active',
            dataIndex: 'active',
            title: 'Trạng thái',
            render: (value) => {
                return value ? <Tag bordered={false} color="blue">Đang đăng bán</Tag> : <Tag bordered={false} color="error">Chưa đăng bán</Tag>
            }
        },
        {
            key: 'action',
            title: 'Hành động',
            render: (_, data) => {
                return (
                    <Space>
                        <Switch size="small"
                            defaultChecked={data.active}
                            onChange={(e) => onChange(e, data)}
                        />
                        <Button
                            variant='text'
                            className='border-none '
                            color='primary'
                            shape="circle"
                            icon={<AiOutlineEdit size={20} />}
                            onClick={() => { setOpen(true); setID(data._id) }}
                        />
                        {/* <Button
                            variant='text'
                            className='border-none '
                            color='danger'
                            shape="circle"
                            icon={<CiTrash size={20} />}
                        /> */}
                    </Space>
                )
            }
        }
    ]

    return (
        <>
            {contextHolder}
            <Table
                columns={column}
                dataSource={dataSource}
                pagination={{
                    pageSize: pageSize,
                    current: currentPage,
                    onChange: (page) => setCurrentPage(page),
                }}

            />
            <EditProductModal open={open} setOpen={setOpen} id={id} />
        </>
    )
}

export default ProductManager
