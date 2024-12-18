import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';

import styles from './Warehouse.module.css';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined } from '@ant-design/icons';
import Warehouse from './components/Warehouse';
import ListInventory from './components/ListInventory';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const WarehouseAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedKey = location.pathname.split('/')[2] || 'warehouse';

    const handleMenuClick = (e) => {
        navigate(`/admin-warehouse/${e.key}`);
    };

    useEffect(() => {
        navigate(`/admin-warehouse/warehouse`);
    }, [navigate])

    const renderContent = () => {
        switch (selectedKey) {
            case 'warehouse':
                return <Warehouse />;
            default:
                return <ListInventory />;
        }
    };

    return (
        <Layout className={styles.customTabsHeight}>
            <Sider width={250} className={`${styles.customTabsHeight} bg-white `}  >
                <div className='text-center text-[24px] font-bold py-4'>
                    Kho hàng
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                    className={`${styles.customTabsHeight1} w-full border-none`}
                >
                    <Menu.Item key="warehouse" icon={<UserOutlined />}>
                        Kho hàng
                    </Menu.Item>
                    <Menu.Item key="listInventory" icon={<AppstoreAddOutlined />}>
                        Danh sách phiếu nhập
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

export default WarehouseAdmin

