
import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Staff.module.css';
import AcceptOrder from './components/AcceptOrder/AcceptOrder';
import AcceptedOrder from './components/AcceptedOrder/AcceptedOrder';
import ProductManager from './components/ProductManager/ProductManager';
import AppCanceledSale from './components/AllCanceledSale/AppCanceledSale';

const { Sider, Content } = Layout;

const Staff = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedKey = location.pathname.split('/')[2] || 'acceptOder';

    const handleMenuClick = (e) => {
        navigate(`/staff/${e.key}`);
    };

    const renderContent = () => {
        switch (selectedKey) {
            case 'acceptOder':
                return <AcceptOrder />;
            case 'acceptedOrder':
                return <AcceptedOrder />;
            case '3':
                return <AppCanceledSale />;
            default:
                return <ProductManager />;
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
                    <Menu.Item key="acceptOder">
                        Danh sách đơn chưa duyệt
                    </Menu.Item>
                    <Menu.Item key="acceptedOrder">
                        Danh sách đơn đã duyệt
                    </Menu.Item>
                    <Menu.Item key="3" >
                        Danh sách đơn hủy
                    </Menu.Item>
                    <Menu.Item key="productManager">
                        Quản lý sản phẩm
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
