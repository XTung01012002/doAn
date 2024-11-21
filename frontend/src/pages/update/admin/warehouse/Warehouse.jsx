
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Image, Space, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataWarehouse } from '../../../../store/admin/warehouse/Warahouse';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './Warehouse.module.css';
import WareHouseModal from './WareHouseModal';

const maxLength = 20;

const columns = [
    {
        title: <span >ID</span>,
        dataIndex: '_id',
        key: '_id',
        render: (text) => (
            <span className="truncate block max-w-[100px]">
                {text && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text || 'Không có dữ liệu'}
            </span>
        ),
    },
    {
        title: <span >Ngày nhập</span>,
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt) => {
            if (!createdAt) return 'Không có dữ liệu';
            const date = new Date(createdAt);
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        },
    },
    {
        title: <span >Ảnh sản phẩm</span>,
        dataIndex: 'productImage',
        key: 'productImage',
        render: (_, { productImage }) => (
            <>
                {Array.isArray(productImage) && productImage.length > 0 ? (
                    <Avatar
                        shape="square"
                        size={64}
                        icon={<Image src={productImage[0]} />}
                    />
                ) : (
                    <span>Không có ảnh</span>
                )}
            </>
        ),
    },
    {
        title: <span >Tên sản phẩm</span>,
        dataIndex: 'productName',
        key: 'productName',
        render: (text) => (
            <span className="truncate block max-w-[200px]">
                {text && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text || 'Không có dữ liệu'}
            </span>
        ),
    },
    {
        title: <span >Thương hiệu</span>,
        dataIndex: 'brandName',
        key: 'brandName',
        render: (text) => (
            <span className="truncate block max-w-[200px]">
                {text && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text || 'Không có dữ liệu'}
            </span>
        ),
    },
    {
        title: <span >Danh mục</span>,
        dataIndex: 'category',
        key: 'category',
        render: (text) => (
            <span className="truncate block max-w-[200px]">
                {text && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text || 'Không có dữ liệu'}
            </span>
        ),
    },
    {
        title: <span >Giá nhập hàng</span>,
        dataIndex: 'price',
        key: 'price',
        render: (price) => price || 'Không có dữ liệu',
    },
    // {
    //     title: <span >Giá khuyến mãi</span>,
    //     dataIndex: 'sellingPrice',
    //     key: 'sellingPrice',
    //     render: (sellingPrice) => sellingPrice || 'Không có dữ liệu',
    // },
    {
        title: <span >Mô tả</span>,
        dataIndex: 'description',
        key: 'description',
        render: (text) => (
            <span className="truncate block max-w-[200px]">
                {text && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text || 'Không có dữ liệu'}
            </span>
        ),
    },
    {
        title: <span >Số lượng</span>,
        dataIndex: 'quantityInStock',
        key: 'quantityInStock',
        render: (quantity) => quantity || 'Không có dữ liệu',
    },
    // {
    //     title: <span >Hành động</span>,
    //     key: 'action', 
    //     dataIndex: 'action',
    //     render: (_value, data) => {
    //         return (
    //             <>
    //                 <Button variant="text" color="primary">
    //                     <EditOutlined />
    //                 </Button>
    //                 <Button color="danger" variant="text">
    //                     <DeleteOutlined />
    //                 </Button>
    //             </>
    //         )
    //     }
    // },
];

const Warehouse = () => {
    const dispatch = useDispatch();
    const dataWH = useSelector((state) => state.warehouse.data || []);
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        dispatch(fetchDataWarehouse());
    }, [dispatch]);

    return (
        <div className={styles.customScrollbar}>
            <Space
                className='flex justify-end pb-4'
            >
                <Button
                    variant='solid'
                    color='primary'
                    onClick={() => setOpen(true)}
                >
                    Thêm sản phẩm
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={dataWH}
                pagination={{ pageSize: 10 }}
            />

            <WareHouseModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default Warehouse;
