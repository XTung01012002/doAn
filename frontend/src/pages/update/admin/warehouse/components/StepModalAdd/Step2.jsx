import { Badge, Button, Form, Input, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostInventoryreceiptCreate, setSubmit } from '../../../../../../store/admin/createBill/CreateBill';
import { fetchDataWarehouse } from '../../../../../../store/admin/warehouse/Warahouse';


const Step2 = ({ current, setCurrent, data, setData }) => {


    const dispatch = useDispatch();
    const dataWH = useSelector((state) => state.warehouse.data || []);
    const [form] = Form.useForm();
    const [options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [products, setProducts] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);


    const loading = useSelector(state => state.createBill.loading)
    const submit = useSelector(state => state.createBill.submit)


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
                productId: item._id,
            }));
            setOptions(tmp);
        }
        // }, []);
    }, [dataWH, options]);
    const handleEditProduct = (index) => {
        const product = products[index];
        form.setFieldsValue(product);
        setSelectedId(product.id);
        setEditingIndex(index);
    };

    const handleSubmit = () => {
        console.log('Danh sách sản phẩm:', products);
        const updatedProducts = products.map(product => ({
            productId: product.productId,
            price: Number(product.price),
            quantity: Number(product.quantity)
        }));

        const merge = { ...data, productList: updatedProducts };
        setData(merge)
        dispatch(PostInventoryreceiptCreate(merge))

    };

   

    useEffect(() => {
        if (submit) {
            setCurrent(current + 1);
            form.resetFields();
            dispatch(fetchDataWarehouse());
            dispatch(setSubmit(false))
        }
    }, [submit, dispatch])

    const onFinish = (value) => {
        form.validateFields()
            .then((values) => {
                const newProduct = { ...values, productId: selectedId };
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
        console.log('Danh sách sản phẩm1:', value);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // const handleSearch = (value) => {
    //     if (value && !options.find((option) => option.value === value)) {
    //         const newOption = {
    //             value: value,
    //             label: value,
    //             productId: null,
    //         };

    //         setOptions((prev) => [...prev, newOption]);

    //         form.setFieldsValue({
    //             nameProduct: value,
    //             brand: null,
    //             category: null,
    //         });
    //     }
    // };

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
    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <>
            <Form
                name="basic"
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                        // onSearch={handleSearch}
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
                <Form.Item
                    label="Giá tiền"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
                >
                    <Input placeholder="Nhập giá sản phẩm . . ." />
                </Form.Item>
                <Form.Item label={null}>
                    <Space className="flex justify-end" size="middle">
                        <Button
                            htmlType='submit'
                            // onClick={handleAddOrUpdateProduct}
                            variant='outlined'
                            color='primary'
                        >
                            {editingIndex !== null ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                        </Button>
                        {/* {products.length > 0 &&
                            <Button type="primary" onClick={handleSubmit}>
                                Xác nhận nhập hàng
                            </Button>
                        } */}
                    </Space>
                </Form.Item>

            </Form>
            {products.length > 0 &&
                <div className='mt-1'>
                    <p className='text-[18px] font-medium mb-2'>Danh sách sản phẩm đã thêm: <Badge count={products.length} showZero color="blue" /></p>
                    <Table
                        dataSource={products.map((product, index) => ({
                            ...product,
                            key: index,
                        }))}
                        columns={columns}
                        pagination={{ pageSize: 2 }}
                    />
                </div>
            }
            <div className='flex justify-end'>
                <Space>
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Quay lại
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={loading}
                        disabled={products.length > 0 ? false : true}
                    >
                        Tiếp theo
                    </Button>
                </Space>
            </div>
        </>
    )
}

export default Step2
