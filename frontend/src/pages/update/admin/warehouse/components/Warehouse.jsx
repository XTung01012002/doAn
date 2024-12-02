
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Image, Space, Steps, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataWarehouse } from '../../../../../store/admin/warehouse/Warahouse';
import WareHouseModal from './WareHouseModal';
import ModalAddProduct from './ModalAddProduct';
import { LoadingOutlined } from '@ant-design/icons';
import formatAmount from '../../../../../components/formatNumber/FormatNumber';
const maxLength = 20;



const Warehouse = () => {
    const dispatch = useDispatch();
    const dataWH = useSelector((state) => state.warehouse.data || []);
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    useEffect(() => {
        dispatch(fetchDataWarehouse());
    }, [dispatch]);
    const [loading, setLoading] = useState(true)
    console.log('dataa', dataWH);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    const columns = [
        {
            title: 'STT',
            dataIndex: '_id',
            key: '_id',
            render: (_text, _record, index) => {
                return (currentPage - 1) * pageSize + index + 1
            }
        },
        {
            title: <span >Ngày nhập</span>,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => {
                return createdAt ? new Date(createdAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }) : '';
            }
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
                <span className="truncate block max-w-[100px]">{text.length > 15 ? `${text.slice(0, 15)}...` : text}</span>
            ),
        },
        {
            title: <span >Thương hiệu</span>,
            dataIndex: 'brandName',
            key: 'brandName',
            render: (text) => (
                <span className="truncate block max-w-[100px]">{text.length > 15 ? `${text.slice(0, 15)}...` : text}</span>
            ),
        },
        {
            title: <span >Danh mục</span>,
            dataIndex: 'category',
            key: 'category',
            render: (text) => (
                <span className="truncate block max-w-[100px]">{text.length > 15 ? `${text.slice(0, 15)}...` : text}</span>
            ),
        },
        {
            title: <span >Giá nhập hàng</span>,
            dataIndex: 'priceInventory',
            key: 'priceInventory',
            render: (values) => {
                return formatAmount(values)
            }
        },
        // {
        //     title: <span >Giá khuyến mãi</span>,
        //     dataIndex: 'sellingPrice',
        //     key: 'sellingPrice',
        //     render: (sellingPrice) => sellingPrice || 'Không có dữ liệu',
        // },
        // {
        //     title: <span >Mô tả</span>,
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text) => (
        //         <span className="truncate block max-w-[200px]">
        //             {text && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text || 'Không có dữ liệu'}
        //         </span>
        //     ),
        // },
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

    return (
        <>
            <div
                className='flex justify-end pb-2'
            >
                <Space>
                    <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => setOpen1(true)}
                    >
                        Thêm sản phẩm
                    </Button>
                    <Button
                        variant='solid'
                        color='primary'
                        onClick={() => setOpen(true)}
                    >
                        Nhập hàng
                    </Button>
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={dataWH}
                pagination={{
                    pageSize: pageSize,
                    current: currentPage,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
            <ModalAddProduct open={open1} setOpen={setOpen1} />
            <WareHouseModal open={open} setOpen={setOpen} />
        </>
    );
};

export default Warehouse;
