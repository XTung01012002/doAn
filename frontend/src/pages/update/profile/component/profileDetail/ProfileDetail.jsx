import { Typography, Spin, Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileDetail = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8088/api/user/userDetail', {
                    withCredentials: true,
                });
                setUserData(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Không thể tải dữ liệu!');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Alert message="Lỗi" description={error} type="error" showIcon />
            </div>
        );
    }

    const { name, email, profilePic } = userData || {};

    return (
        <div className="px-8 py-6 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-10">
            <Typography className="text-[24px] font-bold text-center mb-6">
                Thông tin tài khoản
            </Typography>

            {/* Ảnh đại diện */}
            <div className="flex justify-center mb-6">
                {profilePic ? (
                    <img
                        src={profilePic}
                        alt="Avatar"
                        className="w-32 h-32 object-cover rounded-full border"
                    />
                ) : (
                    <div className="flex items-center justify-center w-32 h-32 border border-dashed border-gray-400 rounded-full">
                        <span className="text-sm">Không có ảnh</span>
                    </div>
                )}
            </div>

            {/* Thông tin tài khoản */}
            <div className="space-y-4 text-center">
                <div>
                    <Typography.Text className="font-bold block">Họ tên:</Typography.Text>
                    <Typography.Text>{name || 'Không có dữ liệu'}</Typography.Text>
                </div>
                <div>
                    <Typography.Text className="font-bold block">Email:</Typography.Text>
                    <Typography.Text>{email || 'Không có dữ liệu'}</Typography.Text>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;
