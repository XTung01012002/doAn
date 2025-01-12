import { Button, Form, Input, Space, Typography, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import styles from './ForgotPassword.module.css';
import SummaryApi from "../../../../../common";

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const handleSubmit = async (values) => {
        setLoading(true); // Bắt đầu loading
        try {
            // Gửi API sửa mật khẩu
            const response = await axios.put(
                `${SummaryApi.changePassword.url}`,
                {
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword,
                },
                {
                    withCredentials: true, // Gửi kèm cookie nếu cần
                }
            );

            if (response.status === 200) {
                message.success('Cập nhật mật khẩu thành công!');
                form.resetFields(); // Reset form sau khi thành công
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại!';
            message.error(errorMessage);
        } finally {
            setLoading(false); // Dừng loading
        }
    };

    return (
        <Form
            name="basic"
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className={`${styles.customScrollbar}`}
        >
            <div className="px-80">
                <Typography className="text-[24px] font-bold mb-10">
                    Đổi mật khẩu
                </Typography>

                <Form.Item
                    label={<span className="font-bold">Mật khẩu cũ</span>}
                    name="currentPassword"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu cũ!' },
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu cũ..." />
                </Form.Item>

                <Form.Item
                    label={<span className="font-bold">Mật khẩu mới</span>}
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới!',
                        },
                        {
                            min: 6,
                            message: 'Mật khẩu mới phải ít nhất 6 ký tự!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu mới..." />
                </Form.Item>

                <Form.Item
                    label={<span className="font-bold">Nhập lại mật khẩu mới</span>}
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng xác nhận mật khẩu mới!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Nhập lại mật khẩu mới..." />
                </Form.Item>

                <Form.Item label={null} className="flex justify-end">
                    <Space>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật
                        </Button>
                    </Space>
                </Form.Item>
            </div>
        </Form>
    );
};

export default ForgotPassword;
