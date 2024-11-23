import React, { useState } from 'react'
import { Layout, Menu } from 'antd';

import styles from './Warehouse.module.css';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined } from '@ant-design/icons';
import Warehouse from './components/Warehouse';

const { Sider, Content } = Layout;

const WarehouseAdmin
    = () => {
        const [selectedKey, setSelectedKey] = useState('1');

        const handleMenuClick = (e) => {
            setSelectedKey(e.key);
        };

        const renderContent = () => {
            switch (selectedKey) {
                case '1':
                    return <Warehouse />;
                default:
                    return <Warehouse />;
            }
        };

        return (
            <Layout className={styles.customTabsHeight}>
                <Sider width={250} className={`${styles.customTabsHeight} bg-white `}  >
                    <div className='text-center text-[24px] font-bold py-4'>
                        Đơn hàng
                    </div>
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        onClick={handleMenuClick}
                        className={`${styles.customTabsHeight1} w-full border-none`}
                    >
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            Kho hàng
                        </Menu.Item>
                        <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
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

