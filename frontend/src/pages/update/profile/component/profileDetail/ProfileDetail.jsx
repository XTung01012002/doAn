import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import uploadImage from '../../../../../helpers/uploadImage';
import styles from './ProfileDetail.module.css';


const ProfileDetail = () => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const inputRef = useRef(null);

    const [fix, setFix] = useState(false)

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async () => {
            setImageUrl(reader.result);
            // await uploadImage(file)
        };
        reader.readAsDataURL(file);
    };

    const handleInput = (e) => {
        const input = e.target;
        let value = input.value.replace(/\./g, '');
        if (value === '') {
            input.value = '';
        } else if (/^\d*$/.test(value)) {
            input.value = new Intl.NumberFormat('vi-VN').format(value);
        }
    };

    const handleSubmit = (value) => {

        if (fix) {
            console.log(value);
            setFix(false)
        } else setFix(true)
    };

    return (
        <Form
            name='basic'
            form={form}
            onFinish={handleSubmit}
            layout={fix ? 'vertical' : 'horizontal'}
            className={`${styles.customScrollbar}`}
        >
            <div className='px-80'>

                <Typography className='text-[24px] font-bold mb-10'>
                    Thông tin tài khoản
                </Typography>

                <Form.Item
                    name="productImage"
                    className='flex justify-center w-full'
                >
                    {imageUrl ? (
                        <div
                            className="relative w-32 h-32 "
                            onClick={() => inputRef.current?.click()}
                        >
                            <img
                                src={imageUrl}
                                alt="Uploaded"
                                className="w-full h-full object-cover rounded-full cursor-pointer"
                            />
                        </div>
                    ) : (
                        <div
                            className="flex flex-col items-center justify-center w-32 h-32 border border-dashed border-gray-400 rounded-full cursor-pointer"
                            onClick={() => inputRef.current?.click()}
                        >
                            <UploadOutlined className="text-xl mb-2" />
                            <span className="text-sm">Tải ảnh lên</span>
                        </div>
                    )}

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                    />
                </Form.Item>

                {fix ?
                    <>
                        <Form.Item label={<span className='font-bold'>Email</span>} name='email'>
                            <Input
                                placeholder='Nhập email...'
                                readOnly
                            />
                        </Form.Item>

                        <Form.Item label={<span className='font-bold'>Họ tên</span>} name='name'>
                            <Input
                                placeholder='Nhập họ tên...'
                            />
                        </Form.Item>

                        <Form.Item label={<span className='font-bold'>Điện thoại</span>} name='phone'>
                            <Input
                                placeholder='Nhập họ tên...'
                            />
                        </Form.Item>

                    </>
                    :
                    <div className='px-[30%]'>

                        <Form.Item label={<span className='font-bold'>Email</span>} name='email'>
                            email@gmail.com
                        </Form.Item>

                        <Form.Item label={<span className='font-bold'>Họ tên</span>} name='name'>
                            Nguyễn Văn A
                        </Form.Item>

                        <Form.Item label={<span className='font-bold'>Số điện thoại</span>} name='phone'>

                        </Form.Item>

                        {/* <Form.Item label={<span className='font-bold'>Số điện thoại</span>} name='productName'>

                        </Form.Item> */}

                    </div>
                }

                <Form.Item
                    label={null}
                    className={`flex justify-end `}
                >
                    <Space>
                        <Button type="primary" htmlType='submit'>
                            {fix ? 'Cập nhật' : 'Sửa thông tin'}
                        </Button>
                    </Space>
                </Form.Item>
            </div>
        </Form>
    );
};

export default ProfileDetail;
