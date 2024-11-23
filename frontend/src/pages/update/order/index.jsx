import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import Bought from './components/bought/Bought';
import Canceled from './components/canceled/Canceled';
import Delivered from './components/delivered/delivered';
import Rates from './components/rated/Rates';
import styles from './Order.module.css';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const OrderPage = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Bought />;
      case '2':
        return <Canceled />;
      case '3':
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
          <Menu.Item key="1" icon={<UserOutlined />}>
            Chưa duyệt
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
            Đã hủy
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
            Đang vận chuyển
          </Menu.Item>
          <Menu.Item key="4" icon={<FileTextOutlined />}>
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
