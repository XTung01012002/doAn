import { Badge, Button, Form, Input, message, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostUploadProduct, setError, setSub } from '../../../../../store/admin/upProduct/UpProductReducer'
import { fetchDataWarehouse } from '../../../../../store/admin/warehouse/Warahouse'
import { LuPencilLine } from 'react-icons/lu'
import { MdOutlineDelete } from 'react-icons/md'
import CustomNotification from '../../../../../components/notification/CustomNotifacation'


const formItem = [

    {
        label: 'Tên sản phẩm',
        name: 'productName',
        message: 'Vui lòng nhập tên sản phẩm',
        placeholder: 'Nhập tên sản phẩm . . .'
    },
    {
        label: 'Nhãn hàng',
        name: 'brandName',
        message: 'Vui lòng nhập nhãn hàng sản phẩm',
        placeholder: 'Nhập nhãn hàng sản phẩm . . .'
    },
    {
        label: 'Phân loại',
        name: 'category',
        message: 'Vui lòng nhập phân loại sản phẩm',
        placeholder: 'Nhập phân loại sản phẩm . . .'

    }
]




const ModalAddProduct = ({ open, setOpen }) => {
    const dispatch = useDispatch();

    const [form] = Form.useForm()
    // const [options, setOptions] = useState([]);
    // const [selectedId, setSelectedId] = useState(null);


    const [products, setProducts] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    const loading = useSelector(state => state.postUpProduct.loading)
    const sub = useSelector(state => state.postUpProduct.sub)
    const error = useSelector(state => state.postUpProduct.error)


    const handleEditProduct = (index) => {
        const product = products[index];
        form.setFieldsValue(product);
        // setSelectedId(product.id);
        setEditingIndex(index);
    };
    const handleDelete = (index) => {
        const tmp = [...products]
        tmp.splice(index, 1)
        setProducts(tmp)

    }

    const handleSubmit = () => {
        console.log('Danh sách sản phẩm:', products);
        dispatch(PostUploadProduct(products))
        // setOpen(false)
        // form.resetFields();
        // setProducts([])
    };

    useEffect(() => {
        if (sub) {
            setOpen(false)
            dispatch(fetchDataWarehouse());
            form.resetFields();
            dispatch(setSub())
            setProducts([])
        }
    }, [sub])

    useEffect(() => {
        if (error) {
            dispatch(setError())
        }
    }, [error])

    const handleClose = () => {
        setOpen(false)
        // form.resetFields();
        // setProducts([]);
    }
    const onFinish = (value) => {
        form.validateFields()
            .then((values) => {
                const newProduct = { ...values };
                if (editingIndex !== null) {
                    const updatedProducts = [...products];
                    updatedProducts[editingIndex] = newProduct;
                    setProducts(updatedProducts);
                    setEditingIndex(null);
                } else {
                    setProducts((prevProducts) => [...prevProducts, newProduct]);
                }

                form.resetFields();
                // setSelectedId(null);
            })
            .catch((info) => {
                console.error('Validate Failed:', info);
            });
        console.log('Danh sách sản phẩm1:', value);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Nhãn hàng',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Phân loại',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record, index) => (
                <Space>
                    <Button className='px-0' variant="link" color='primary' onClick={() => handleEditProduct(index)}>
                        <LuPencilLine size={18} />
                    </Button>
                    <Button className='px-2' variant="link" color='danger' onClick={() => handleDelete(index)}>
                        <MdOutlineDelete size={18} />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <CustomNotification
                success={sub && 'Thêm sản phẩm thành công'}
                error={error}
            />
            <Modal
                open={open}
                onClose={handleClose}
                onCancel={handleClose}
                title={<div className='text-center'>Thêm sản phẩm mới</div>}
                footer={false}
                closeIcon={false}
                centered
                width={900}
            >
                <Form
                    form={form}
                    name='basic'
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {formItem.map((item, index) => {

                        return (
                            <Form.Item
                                name={item.name}
                                key={index}
                                label={item.label}
                                rules={[{ required: true, message: item.message }]}
                            >
                                <Input placeholder={item.placeholder} />
                            </Form.Item>
                        )
                    })}
                    <Form.Item label={null}>
                        <Space className="flex justify-end" size="middle">
                            <Button
                                htmlType='submit'
                                variant='outlined'
                                color='primary'
                            >
                                {editingIndex !== null ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                            </Button>
                            {products.length > 0 &&
                                <Button
                                    type="primary"
                                    onClick={handleSubmit}
                                    loading={loading}
                                >
                                    Xác nhận
                                </Button>
                            }
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
            </Modal>
        </>
    )
}

export default ModalAddProduct
