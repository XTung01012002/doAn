import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined } from '@ant-design/icons';
import styles from './Staff.module.css';
import AcceptOrder from './components/AcceptOrder/AcceptOrder';

const { Sider, Content } = Layout;

const Staff = () => {
    const [selectedKey, setSelectedKey] = useState('1');

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <AcceptOrder />;
            case '2':
                return <div>Cập nhật hàng từ kho</div>;
            case '3':
                return <div>Tab 2 Content</div>;
            default:
                return <div>Content not available</div>;
        }
    };

    return (
        <Layout className={styles.customTabsHeight}>
            <Sider width={250} className={`${styles.customTabsHeight} bg-white `}  >
                <div className='text-center text-[24px] font-bold py-4'>
                    Nhân viên
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                    className={`${styles.customTabsHeight1} w-full border-none`}
                >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Danh sách đơn chưa duyệt
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
                        Danh sách đơn đã duyệt
                    </Menu.Item>
                    <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
                        Danh sách đơn hủy
                    </Menu.Item>
                    <Menu.Item key="4" icon={<FileTextOutlined />}>
                        Danh sách sản phẩm từ kho
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

export default Staff;
