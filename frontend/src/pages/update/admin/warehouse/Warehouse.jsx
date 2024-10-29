
import React, { useEffect } from 'react';
import { Avatar, Button, Image, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataWarehouse } from '../../../../store/admin/warehouse/Warahouse';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './Warehouse.module.css'

const maxLength = 20;

const columns = [
    {
        title: <span className="whitespace-nowrap">ID</span>,
        dataIndex: '_id',
        key: '_id',
        render: (text) => (
            <span className="truncate block max-w-[100px]">{text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}</span>
        ),
    },
    {
        title: <span className="whitespace-nowrap">Ngày tạo</span>,
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt) => {
            const date = new Date(createdAt);
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }
    },
    {
        title: <span className="whitespace-nowrap">Ngày cập nhật</span>,
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (updatedAt) => {
            const date = new Date(updatedAt);
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }
    },
    {
        title: <span className="whitespace-nowrap">Ảnh sản phẩm</span>,
        dataIndex: 'productImage',
        key: 'productImage',
        render: (_, { productImage }) => (
            <>
                {productImage.length > 0 && (
                    <Avatar
                        shape="square"
                        size={64}
                        icon={<Image src={productImage[0]} />}
                    />
                )}
            </>
        )
    },
    {
        title: <span className="whitespace-nowrap">Tên sản phẩm</span>,
        dataIndex: 'productName',
        key: 'productName',
        render: (text) => (
            <span className="truncate block max-w-[200px]">{text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}</span>
        ),
    },
    {
        title: <span className="whitespace-nowrap">Thương hiệu</span>,
        dataIndex: 'brandName',
        key: 'brandName',
        render: (text) => (
            <span className="truncate block max-w-[200px]">{text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}</span>
        ),
    },
    {
        title: <span className="whitespace-nowrap">Danh mục</span>,
        dataIndex: 'category',
        key: 'category',
        render: (text) => (
            <span className="truncate block max-w-[200px]">{text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}</span>
        ),
    },
    {
        title: <span className="whitespace-nowrap">Giá niêm yết</span>,
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: <span className="whitespace-nowrap">Giá khuyến mãi</span>,
        dataIndex: 'sellingPrice',
        key: 'sellingPrice',
    },
    {
        title: <span className="whitespace-nowrap">Mô tả</span>,
        dataIndex: 'description',
        key: 'description',
        render: (text) => (
            <span className="truncate block max-w-[200px]">{text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}</span>
        ),
    },
    {
        title: <span className="whitespace-nowrap">Hành động</span>,
        key: 'action',
        render: () => (
            <>
                <Button
                    variant="text"
                    color='primary'
                >
                    <EditOutlined />
                </Button>
                <Button
                    color='danger'
                    variant='text'
                >
                    <DeleteOutlined />
                </Button>
            </>
        ),
    }
];

const Warehouse = () => {

    const dispatch = useDispatch();

    const dataWH = useSelector((state) => state.warehouse.data)
    console.log('dataxxx: ', dataWH);

    useEffect(() => {
        dispatch(fetchDataWarehouse());
    }, [dispatch])


    return (
        <div className={styles.customScrollbar}>
            <Table
                className="whitespace-nowrap"
                columns={columns}
                dataSource={dataWH}
                pagination={{ pageSize: 6 }}
            />
        </div>
    )
}

export default Warehouse;
