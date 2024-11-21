
import { Button, Form, Modal, Select, Space } from 'antd';
import React, { useState } from 'react';

const WareHouseModal = ({ open, setOpen }) => {
    const [form] = Form.useForm();
    const [options, setOptions] = useState([
        { value: '1', label: 'Jack' },
        { value: '2', label: 'Lucy' },
        { value: '3', label: 'Tom' },
    ]);
    const [productList, setProductList] = useState([{}]); 

    const handleSubmit = (values) => {
        console.log('Form data:', values);
    };

    const handleSearch = (value) => {
        if (value && !options.find((option) => option.value === value)) {
            setOptions((prevOptions) => [
                ...prevOptions,
                { value, label: value },
            ]);
        }
    };

    const addProduct = () => {
        setProductList((prevList) => [...prevList, {}]); 
    };

    const removeProduct = (index) => {
        setProductList((prevList) => prevList.filter((_, i) => i !== index));
    };

    const handleChange = (value, index) => {
        form.setFieldsValue({
            [`nameProduct_${index}`]: value, 
        });
    };

    return (
        <Modal
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            centered
            footer={false}
            closeIcon={false}
            width={600}
        >
            <Form
                name="basic"
                form={form}
                onFinish={handleSubmit}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                {productList.map((_, index) => (
                    <Form.Item
                        label={`Tên sản phẩm ${index + 1}`}
                        name={`nameProduct_${index}`}
                        key={index}
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                    >
                        <div className='flex'>
                            <Select
                                mode="combobox"
                                placeholder="Nhập hoặc chọn tên sản phẩm"
                                options={options}
                                showSearch
                                allowClear
                                onSearch={handleSearch}
                                onChange={(value) => handleChange(value, index)} 
                            />
                            <Button
                                className='ml-2'
                                onClick={() => removeProduct(index)}
                            >
                                -
                            </Button>
                        </div>
                    </Form.Item>
                ))}

                <Form.Item className='flex justify-end w-full'>
                    <Space>
                        <Button onClick={addProduct}>+</Button>
                    </Space>
                </Form.Item>

                <Form.Item className="flex justify-end">
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default WareHouseModal;
