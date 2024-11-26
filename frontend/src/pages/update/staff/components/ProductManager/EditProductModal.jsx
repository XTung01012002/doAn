import { Avatar, Button, Divider, Form, Input, message, Modal, Space, Tooltip, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { AntDesignOutlined, PlusOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { PutProductStaff } from '../../../../../store/staff/EditProduct';
import { fetchDataWarehouse } from '../../../../../store/admin/warehouse/Warahouse';

const EditProductModal = ({ open, setOpen, id }) => {

    const data = useSelector(state => state.warehouse.data)
    const loading = useSelector(state => state.putProductStaff.loading)
    const sub = useSelector(state => state.putProductStaff.sub)
    // console.log('ada', data);
    const dispatch = useDispatch()

    const [form] = Form.useForm();
    const [fileList1, setFileList1] = useState([]);
    const [fileList, setFileList] = useState([]);

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thành công.',
            duration: 3,
        });
    };


    useEffect(() => {
        if (id) {
            const product = data.find((item) => item._id === id);
            // console.log('productsasdasdasdasd', product);

            if (product) {
                form.setFieldsValue({
                    productName: product.productName,
                    brandName: product.brandName,
                    category: product.category,
                    priceInventory: product.priceInventory,
                    quantitySold: product.quantitySold,
                    description: product.description,
                    productImage: product.productImage
                });

                setFileList(product.productImage)
            }
        }
    }, [id, data, form]);

    const handleSubmit = (value) => {


        const convertedValue = {
            ...value,
            priceInventory: typeof value.priceInventory === 'string'
                ? parseInt(value.priceInventory.replace(/\./g, ''), 10)
                : value.priceInventory,
            quantitySold: typeof value.quantitySold === 'string'
                ? parseInt(value.quantitySold.replace(/\./g, ''), 10)
                : value.quantitySold,
            productImage: value.productImage.length > 0 ? value.productImage : fileList1.length === 0 ? [] : fileList1
        };

        console.log('ID:', id);
        console.log('Converted Value:', convertedValue);

        // if (!id || typeof id !== 'string' && typeof id !== 'number') {
        //     console.error('Invalid ID:', id);
        //     return;
        // }
        console.log(convertedValue);

        dispatch(PutProductStaff({ id: id, data: convertedValue }));
    };

    useEffect(() => {
        if (sub) {
            setOpen(false)
            success()
            dispatch(fetchDataWarehouse())
        }
    }, [sub])

    const handleInput = (e) => {
        const input = e.target;
        let value = input.value.replace(/\./g, '');

        if (value === '') {
            input.value = '';
        } else if (/^\d*$/.test(value)) {
            input.value = new Intl.NumberFormat('vi-VN').format(value);
        }
    };
    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList)
        const files = fileList.map((file) =>
            file.originFileObj ? file.originFileObj : file
        );
        setFileList1(files);
        form.setFieldsValue({
            // productImage: files
            productImage: fileList
        });
    };

    // console.log('ádasdasdasd', fileList1);


    const beforeUpload = (file) => {
        return false;
    };
    return (
        <>
            {contextHolder}
            <Modal
                title={<div className="text-center">Sửa thông tin sản phẩm</div>}
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={
                    <div className="flex justify-end" style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '10px 16px', zIndex: 1 }}>
                        <Space>
                            <Button onClick={() => setOpen(false)} color="danger">
                                Hủy
                            </Button>
                            <Button
                                onClick={() => form.submit()}
                                color="primary"
                                type="primary"
                                loading={loading}
                            >
                                Cập nhật
                            </Button>
                        </Space>
                    </div>
                }
                closeIcon={false}
                style={{ maxHeight: '80vh' }}
                styles={{
                    body: {
                        maxHeight: 'calc(70vh - 60px)',
                        overflowY: 'auto',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'white transparent',
                    }

                }}
            >
                <Form
                    name='basic'
                    form={form}
                    onFinish={handleSubmit}
                    layout='vertical'
                    className='mr-1'
                >
                    <Form.Item
                        name="productImage"
                        className='flex justify-center'
                    >
                        <Space direction='vertical' size={16}>
                            {fileList[0] && (

                                <Avatar
                                    src={typeof fileList[0] === 'string'
                                        ? fileList[0]
                                        : fileList[0].originFileObj
                                            ? URL.createObjectURL(fileList[0].originFileObj)
                                            : null
                                    }
                                    shape="square"
                                    size={200}
                                />
                            )}
                            <Avatar.Group
                                max={{
                                    count: 2,
                                    style: { color: '#f56a00', backgroundColor: '#fde3cf' },
                                }}
                            >
                                {fileList.slice(1).map((file, index) => (
                                    <Avatar
                                        key={index}
                                        src={typeof file === 'string'
                                            ? file
                                            : file.originFileObj
                                                ? URL.createObjectURL(file.originFileObj)
                                                : null
                                        }
                                        alt={`thumbnail-${index}`}
                                        style={{ borderRadius: 4 }}
                                    />
                                ))}
                            </Avatar.Group>
                        </Space>

                        <div className='flex justify-center mt-2'>
                            <Upload
                                // listType="picture-card"
                                fileList={[]}
                                beforeUpload={beforeUpload}
                                onChange={handleUploadChange}
                                multiple
                            >

                                <Button icon={<UploadOutlined />}>
                                    Thêm ảnh
                                </Button>
                            </Upload>
                        </div>
                    </Form.Item>


                    <Form.Item
                        label='Tên sản phẩm'
                        name='productName'
                    >
                        <Input placeholder='Nhập tên sản phẩm...' />
                    </Form.Item>

                    <Form.Item
                        label='Thương hiệu'
                        name='brandName'
                    >
                        <Input placeholder='Nhập thương hiệu...' />
                    </Form.Item>

                    <Form.Item
                        label='Danh mục'
                        name='category'
                    >
                        <Input placeholder='Nhập danh mục sản phẩm...' />
                    </Form.Item>
                    <Form.Item
                        label='Giá nhập sản phẩm'
                        name='priceInventory'
                    >
                        <Input
                            placeholder='Nhập giá nhập sản phẩm...'
                            suffix="VNĐ"
                            onInput={handleInput}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Giá bán sản phẩm'
                        name='quantitySold'

                    >
                        <Input
                            placeholder='Nhập giá bán..'
                            suffix="VNĐ"
                            onInput={handleInput}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Mô tả'
                        name='description'
                    >
                        <Input
                            placeholder='Nhập mô tả..'

                        />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default EditProductModal
