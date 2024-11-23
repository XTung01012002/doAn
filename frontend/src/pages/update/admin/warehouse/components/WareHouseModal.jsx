import { Button, Divider, Form, Input, Modal, Select, Space, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const WareHouseModal = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const dataWH = useSelector((state) => state.warehouse.data || []);
    const [form] = Form.useForm();
    const [options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [products, setProducts] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);


    console.log('ádasasd', dataWH);


    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'nameProduct',
            key: 'nameProduct',
        },
        {
            title: 'Nhãn hàng',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Phân loại',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record, index) => (
                <Button type="link" onClick={() => handleEditProduct(index)}>
                    Chỉnh sửa
                </Button>
            ),
        },
    ];

    useEffect(() => {
        if (dataWH.length !== options.length) {
            const tmp = dataWH.map((item) => ({
                value: item.productName,
                label: item.productName,
                id: item._id,
            }));
            setOptions(tmp);
        }
    }, []);
    // }, [dataWH, options]);



    const handleAddOrUpdateProduct = () => {
        form.validateFields()
            .then((values) => {
                const newProduct = { ...values, id: selectedId };

                if (editingIndex !== null) {
                    const updatedProducts = [...products];
                    updatedProducts[editingIndex] = newProduct;
                    setProducts(updatedProducts);
                    setEditingIndex(null);
                } else {
                    setProducts((prevProducts) => [...prevProducts, newProduct]);
                }

                form.resetFields();
                setSelectedId(null);
            })
            .catch((info) => {
                console.error('Validate Failed:', info);
            });
    };

    const handleEditProduct = (index) => {
        const product = products[index];
        form.setFieldsValue(product);
        setSelectedId(product.id);
        setEditingIndex(index);
    };

    const handleSubmit = () => {
        console.log('Danh sách sản phẩm:', products);
    };



    const handleSearch = (value) => {
        if (value && !options.find((option) => option.value === value)) {
            const newOption = {
                value: value,
                label: value,
                id: null,
            };

            setOptions((prev) => [...prev, newOption]);

            form.setFieldsValue({
                nameProduct: value,
                brand: null,
                category: null,
            });
        }
    };

    const handleChange = (value) => {
        const selectedOption = dataWH.find((item) => item.productName === value);

        if (selectedOption) {
            form.setFieldsValue({
                nameProduct: selectedOption.productName,
                brand: selectedOption.brandName,
                category: selectedOption.category,
            });
            setSelectedId(selectedOption._id);
        } else {
            form.setFieldsValue({
                nameProduct: value,
                brand: undefined,
                category: undefined,
            });
            setSelectedId(null);
        }
    };
    return (
        <Modal
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            centered
            footer={false}
            closeIcon={false}
            width={900}
        >
            <Form
                name="basic"
                form={form}
                layout="vertical"
            >
                <Form.Item
                    label={`Tên sản phẩm`}
                    name={`nameProduct`}
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                >
                    <Select
                        mode="combobox"
                        placeholder="Nhập hoặc chọn tên sản phẩm . . ."
                        options={options}
                        showSearch
                        allowClear
                        onSearch={handleSearch}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Nhãn hàng"
                    name="brand"
                    rules={[{ required: true, message: 'Vui lòng nhập nhãn hàng sản phẩm' }]}
                >
                    <Input placeholder="Nhập nhãn hàng . . ." />
                </Form.Item>
                <Form.Item
                    label="Phân loại"
                    name="category"
                    rules={[{ required: true, message: 'Vui lòng nhập phân loại sản phẩm' }]}
                >
                    <Input placeholder="Nhập phân loại . . ." />
                </Form.Item>
                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm' }]}
                >
                    <Input placeholder="Nhập số lượng . . ." />
                </Form.Item>
                <Space className="flex justify-end" size="middle">
                    <Button onClick={handleAddOrUpdateProduct} type="dashed">
                        {editingIndex !== null ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                    </Button>
                    {products.length > 0 &&
                        <Button type="primary" onClick={handleSubmit}>
                            Xác nhận tất cả
                        </Button>
                    }
                </Space>
            </Form>
            {products.length > 0 &&
                <div style={{ marginTop: 20 }}>
                    <p className='text-[18px] font-medium mb-2'>Danh sách sản phẩm đã thêm:</p>
                    <Table
                        dataSource={products.map((product, index) => ({
                            ...product,
                            key: index,
                        }))}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            }

        </Modal>
    );
};

export default WareHouseModal;
