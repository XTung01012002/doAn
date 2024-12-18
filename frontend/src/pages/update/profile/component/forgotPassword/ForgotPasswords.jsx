import { Button, Form, Input, Space, Typography } from 'antd';
import React from 'react';
import styles from './ForgotPassword.module.css';


const ForgotPassword = () => {
    const [form] = Form.useForm();


    const handleSubmit = (value) => {
        console.log(value);
    };

    return (

        <Form
            name='basic'
            form={form}
            onFinish={handleSubmit}
            layout='vertical'
            className={`${styles.customScrollbar}`}
        >
            <div className='px-80'>

                <Typography className='text-[24px] font-bold mb-10'>
                    Đổi mật khẩu
                </Typography>

                <Form.Item label={<span className='font-bold'>Mật khẩu cũ</span>} name='passwordOld'>
                    <Input
                        placeholder='Nhập mật khẩu cũ...'
                        readOnly
                    />
                </Form.Item>

                <Form.Item label={<span className='font-bold'>Mật khẩu mới</span>} name='passwordNew'>
                    <Input
                        placeholder='Nhập mật khẩu mới...'
                    />
                </Form.Item>

                <Form.Item label={<span className='font-bold'>Nhập lại mật khẩu mới</span>} name='passwordNewAgain'>
                    <Input
                        placeholder='Nhập lại mật khẩu mới...'
                    />
                </Form.Item>


                <Form.Item
                    label={null}
                    className={`flex justify-end `}
                >
                    <Space>
                        <Button type="primary" htmlType='submit'>
                            Cập nhật
                        </Button>
                    </Space>
                </Form.Item>

            </div>
        </Form>
    );

};

export default ForgotPassword;
