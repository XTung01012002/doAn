import { Avatar, Button, Divider, Form, Input, message, Modal, Space, Tooltip, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { AntDesignOutlined, PlusOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { PutProductStaff } from '../../../../../store/staff/EditProduct';
import { fetchDataWarehouse } from '../../../../../store/admin/warehouse/Warahouse';
import uploadImage from '../../../../../helpers/uploadImage';


const EditProductModal = ({ open, setOpen, id }) => {

    const data = useSelector(state => state.warehouse.data)
    const loading = useSelector(state => state.putProductStaff.loading)
    const sub = useSelector(state => state.putProductStaff.sub)
    console.log('ada', data);
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

            if (product) {
                form.setFieldsValue({
                    productName: product.productName || '',
                    brandName: product.brandName || '',
                    category: product.category || '',
                    priceInventory: product.priceInventory || '',
                    price: product.price || '',
                    sellingPrice: product.sellingPrice || '',
                    description: product.description || '',
                    productImage: product.productImage || ''
                });

                setFileList(product.productImage)
            }
        }
    }, [id]);

    const handleSubmit = (value) => {
        const { priceInventory, ...rest } = value;

        const convertedValue = {
            ...rest,
            price: typeof rest.price === 'string'
                ? parseInt(rest.price.replace(/\./g, ''), 10)
                : rest.price,
            sellingPrice: typeof rest.sellingPrice === 'string'
                ? parseInt(rest.sellingPrice.replace(/\./g, ''), 10)
                : rest.sellingPrice,
            productImage: rest.productImage.length > 0 ? rest.productImage : fileList1.length === 0 ? [] : fileList1,
        };

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

    // const handleUploadChange = ({ fileList: newFileList }) => {
    //     const files = newFileList.map((file) =>
    //         file.originFileObj ? file.originFileObj : file
    //     );

    //     const uniqueFileList = [...fileList];
    //     const uniqueFileList1 = [...fileList1];

    //     newFileList.forEach(item => uniqueFileList.push(item))
    //     files.forEach(item => uniqueFileList1.push(item))

    //     setFileList(uniqueFileList);
    //     setFileList1(uniqueFileList1);

    //     form.setFieldsValue({
    //         productImage: uniqueFileList,
    //     });
    // };

    const handleUploadChange = async ({ fileList: newFileList }) => {
        const updatedFileList = [...fileList];
        const updatedFileList1 = [...fileList1];

        for (const file of newFileList) {
            if (file.originFileObj) {
                try {
                    const response = await uploadImage(file.originFileObj);
                    updatedFileList.push(response.secure_url);
                    updatedFileList1.push(response.secure_url);
                } catch (error) {
                    console.error("Error uploading image:", error);
                    message.error("Không thể tải ảnh lên Cloudinary.");
                }
            }
        }

        setFileList(updatedFileList);
        setFileList1(updatedFileList1);

        form.setFieldsValue({
            productImage: updatedFileList,
        });
    };

    const handleRemoveImage = (index) => {
        const updatedFileList = [...fileList];
        const updatedFileList1 = [...fileList1];

        updatedFileList.splice(index, 1);
        updatedFileList1.splice(index - 1, 1);

        setFileList(updatedFileList);
        setFileList1(updatedFileList1);

        form.setFieldsValue({
            productImage: updatedFileList,
        });
    };

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
                                Cập nhập
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
                        className='flex justify-center w-full'
                    >
                        <Space direction='vertical' size={16} className='w-full'>
                            <Space className="flex justify-center" style={{ position: 'relative' }}>
                                {fileList[0] && (
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                        <Avatar
                                            src={
                                                typeof fileList[0] === 'string'
                                                    ? fileList[0]
                                                    : fileList[0].originFileObj instanceof File
                                                        ? URL.createObjectURL(fileList[0].originFileObj)
                                                        : null
                                            }
                                            shape="square"
                                            size={200}
                                        />
                                        <Button
                                            type="text"
                                            danger
                                            shape="circle"
                                            size="small"
                                            icon={<PlusOutlined rotate={45} />}
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                right: 5,
                                                backgroundColor: 'white',
                                                border: '1px solid lightgray',
                                                zIndex: 10,
                                            }}
                                            onClick={() => handleRemoveImage(0)}
                                        />
                                    </div>
                                )}
                            </Space>

                            <div
                                className="flex justify-center overflow-x-scroll "
                                style={{
                                    maxWidth: "100%",
                                    width: "300px",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {fileList.slice(1).map((file, index) => {
                                    const src = typeof file === 'string'
                                        ? file
                                        : file.originFileObj instanceof File
                                            ? URL.createObjectURL(file.originFileObj)
                                            : null;

                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                position: 'relative',
                                                display: 'inline-block',
                                                marginRight: 8,
                                            }}
                                        >
                                            {src && (
                                                <Avatar
                                                    src={src}
                                                    alt={`thumbnail-${index}`}
                                                    style={{ borderRadius: 4 }}
                                                    size={60}
                                                />
                                            )}
                                            <Button
                                                type="text"
                                                danger
                                                shape="circle"
                                                size="small"
                                                icon={<PlusOutlined rotate={45} />}
                                                style={{
                                                    position: 'absolute',
                                                    top: -5,
                                                    right: -5,
                                                    backgroundColor: 'white',
                                                    border: '1px solid lightgray',
                                                    zIndex: 10,
                                                }}
                                                onClick={() => handleRemoveImage(index + 1)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>


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
                            readOnly
                        />
                    </Form.Item>
                    <Form.Item
                        label='Giá gốc sản phẩm'
                        name='price'
                        rules={[{
                            required: true,
                            message: 'Giá gốc không được trống'
                        }]}
                    >
                        <Input
                            placeholder='Nhập giá bán..'
                            suffix="VNĐ"
                            onInput={handleInput}

                        />
                    </Form.Item>
                    <Form.Item
                        label='Giá khuyến mãi'
                        name='sellingPrice'
                        rules={[{
                            required: true,
                            message: 'Giá khuyến mãi không được trống'
                        }]}

                    >
                        <Input
                            placeholder='Nhập giá khuyến mãi..'
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
