import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';

const formItem = [
    {
        label: 'Nhà cung cấp',
        name: 'supply',
        message: 'Vui lòng nhập tên sản phẩm',
        placeholder: 'Nhập nhà cung cấp . . .'
    },
    {
        label: 'Địa chỉ',
        name: 'address',
        message: 'Vui lòng nhập nhãn hàng sản phẩm',
        placeholder: 'Nhập địa chỉ . . .'
    },
    {
        label: 'Người giao hàng',
        name: 'shipper',
        message: 'Vui lòng nhập phân loại sản phẩm',
        placeholder: 'Nhập người giao hàng . . .'
    },
    {
        label: 'Số điện thoại',
        name: 'phoneNumber',
        message: 'Vui lòng nhập số điện thoại',
        placeholder: 'Nhập số điện thoại . . .'
    }
];

const Step1 = ({ current, setCurrent, data, setData }) => {
    const [form] = Form.useForm();


    const onFinish = (values) => {
        console.log(values);
        const merge = { ...data, ...values };
        setData(merge);
        setCurrent(current + 1);
    };

    const onFinished = () => {
        console.log('error');
    };

    return (
        <Form
            name="basic"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinished}
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
                );
            })}
            <Form.Item label={null} className="flex justify-end">
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Next
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Step1;
