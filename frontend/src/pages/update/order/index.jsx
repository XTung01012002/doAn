import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import Bought from './components/bought/Bought';
import Canceled from './components/canceled/Canceled';
import Delivered from './components/delivered/delivered';
import Rates from './components/rated/Rates';
import styles from './Order.module.css';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const OrderPage = () => {


  const nav = useNavigate();
  const location = useLocation()

  const selectedKey = location.pathname.split('/')[2] || 'bought'

  const handleMenuClick = (e) => {
    nav(`/order/${e.key}`)
  };

  const renderContent = () => {
    switch (selectedKey) {
      case 'bought':
        return <Bought />;
      case 'canceled':
        return <Canceled />;
      case 'delivered':
        return <Delivered />;
      default:
        return <Rates />;
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
          <Menu.Item key="bought" icon={<UserOutlined />}>
            Chưa duyệt
          </Menu.Item>
          <Menu.Item key="canceled" icon={<AppstoreAddOutlined />}>
            Đã hủy
          </Menu.Item>
          <Menu.Item key="delivered" icon={<AppstoreAddOutlined />}>
            Đang vận chuyển
          </Menu.Item>
          <Menu.Item key="rates" icon={<FileTextOutlined />}>
            Đánh giá
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

export default OrderPage
