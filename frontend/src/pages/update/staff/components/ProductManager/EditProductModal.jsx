import { Button, Form, Input, Modal, Space } from 'antd'
import React from 'react'

const EditProductModal = ({ open, setOpen }) => {
    const [form] = Form.useForm();
    const handleSubmit = (value) => {
        console.log('formdata', value);

    }

    const handleInput = (e) => {
        const input = e.target;
        let value = input.value.replace(/\./g, '');

        if (value === '') {
            input.value = '';
        } else if (/^\d*$/.test(value)) {
            input.value = new Intl.NumberFormat('vi-VN').format(value);
        }
    };



    return (
        <Modal
            title={<div className="text-center">Sửa thông tin sản phẩm</div>}
            open={open}
            onCancel={() => setOpen(false)}
            centered
            footer={null}
            closeIcon={false}
        >
            <Form
                name='basic'
                form={form}
                onFinish={handleSubmit}
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 16
                }}
            >
                {/* uploadAnh */}


                <Form.Item
                    label='Tên sản phẩm'
                    name='productName'
                >
                    <Input placeholder='Nhập tên sản phẩm...' />
                </Form.Item>

                <Form.Item
                    label='Tên thương hiệu'
                    name='brandName'
                >
                    <Input placeholder='Nhập tên thương hiệu...' />
                </Form.Item>

                <Form.Item
                    label='Phân loại'
                    name='category'
                >
                    <Input placeholder='Nhập phân loại sản phẩm...' />
                </Form.Item>
                <Form.Item
                    label='Giá sản phẩm'
                    name='price'
                >
                    <Input
                        placeholder='Nhập giá sản phẩm...'
                        suffix="VNĐ"
                        onInput={handleInput}
                    />
                </Form.Item>
                <Form.Item
                    label='Giá bán'
                    name='sellingPrice'

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

                <Form.Item
                    className='flex justify-end'
                >
                    <Space>
                        <Button
                            color='danger'
                            variant='filled'
                        >
                            Hủy
                        </Button>
                        <Button
                            color='primary'
                            variant='solid'
                            htmlType='submit'
                        >
                            Cập nhật
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default EditProductModal
