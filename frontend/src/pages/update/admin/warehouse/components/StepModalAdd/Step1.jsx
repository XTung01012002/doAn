import { Button, Form, Input, DatePicker, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import moment from 'moment';



const formItem = [
    {
        label: 'Nhà cung cấp',
        name: 'supplierName',
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
        name: 'deliveryPerson',
        message: 'Vui lòng nhập phân loại sản phẩm',
        placeholder: 'Nhập người giao hàng . . .'
    }
];

const Step1 = ({ current, setCurrent, data, setData }) => {
    
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            const formattedData = {
                ...data,
                date: data.date ? moment(data.date, 'DD-MM-YYYY') : null,
            };
            form.setFieldsValue(formattedData);
        }
    }, [data, form]);


    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const onFinish = (values) => {
        console.log(values);
        const merge = {
            ...data,
            ...values,
            date: values.date.format('YYYY-MM-DD')
        };
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
            {formItem.map((item, index) => (
                <Form.Item
                    name={item.name}
                    key={index}
                    label={item.label}
                    rules={[{ required: true, message: item.message }]}
                >
                    <Input placeholder={item.placeholder} />
                </Form.Item>
            ))}

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="phoneNumber"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                        <Input placeholder="Nhập số điện thoại . . ." />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="date"
                        label="Ngày giao hàng"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày giao hàng' }]}
                    >
                        <DatePicker onChange={onChange} style={{ width: '100%' }} format="DD-MM-YYYY" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item className="flex justify-end">
                <Button type="primary" htmlType="submit">
                    Next
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Step1;
