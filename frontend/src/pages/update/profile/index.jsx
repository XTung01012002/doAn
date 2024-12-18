
import { Layout, Menu } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProfileAccount.module.css';
import ProfileDetail from './component/profileDetail/ProfileDetail';
import ForgotPassword from './component/forgotPassword/ForgotPasswords';


const { Sider, Content } = Layout;

const ProfileAccount = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedKey = location.pathname.split('/')[2] || 'profileDetail';

    const handleMenuClick = (e) => {
        navigate(`/profileAccount/${e.key}`);
    };
    useEffect(() => {
        navigate(`/profileAccount/profileDetail`);
    }, [navigate])

    const renderContent = () => {
        switch (selectedKey) {
            case 'profileDetail':
                return <ProfileDetail />;
            default:
                return <ForgotPassword />;
        }
    };

    return (
        <Layout className={styles.customTabsHeight}>
            <Sider width={250} className={`${styles.customTabsHeight} bg-white`}>
                <div className="text-center text-[24px] font-bold py-4">Nhân viên</div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                    className={`${styles.customTabsHeight1} w-full border-none`}
                >
                    <Menu.Item key="profileDetail">
                        Thông tin tài khoản
                    </Menu.Item>
                    <Menu.Item key="acceptedOrder">
                        Đổi mật khẩu
                    </Menu.Item>

                </Menu>
            </Sider>

            <Layout style={{ padding: '24px 24px 24px' }}>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: '#fff',
                        borderRadius: '8px',
                    }}
                >
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProfileAccount;
