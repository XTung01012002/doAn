import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import styles from './pageAdmin.module.css';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import AllUser from '../../../AllUser';
import AllProduct from '../../../AllProduct';
import AllUserAdmin from './components/AllUsersAdmin';
import Statistical from './components/Statistical';


const { Sider, Content } = Layout;

const PageAdmin = () => {


    const nav = useNavigate();
    const location = useLocation()

    const selectedKey = location.pathname.split('/')[2] || 'statistical'

    const handleMenuClick = (e) => {
        nav(`/admin-panel/${e.key}`)
    };

    const renderContent = () => {
        switch (selectedKey) {

            case 'statistical':
                return <Statistical />
            case 'all-users':
                return <AllUserAdmin />
            // return <AllUser />;
            default:
                return <AllProduct />;
        }
    };

    return (
        <Layout className={styles.customTabsHeight}>
            <Sider width={250} className={`${styles.customTabsHeight} bg-white `}  >
                <div className='text-center text-[24px] font-bold py-4'>
                    Admin
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                    className={`${styles.customTabsHeight1} w-full border-none`}
                >
                    <Menu.Item key="statistical" icon={<FileTextOutlined />}>
                        Thống kê
                    </Menu.Item>
                    <Menu.Item key="all-users" icon={<UserOutlined />}>
                        Quản lý tài khoản
                    </Menu.Item>
                    <Menu.Item key="all-products" icon={<AppstoreAddOutlined />}>
                        Danh sách sản phẩm
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

export default PageAdmin
