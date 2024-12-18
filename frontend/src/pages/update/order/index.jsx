import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd';
import Bought from './components/bought/Bought';
import Canceled from './components/canceled/Canceled';
import Delivered from './components/delivered/delivered';
import Rates from './components/rated/Rates';
import styles from './Order.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Ordered from './components/ordered/Ordered';


const { Sider, Content } = Layout;

const OrderPage = () => {

  const nav = useNavigate();
  const location = useLocation()

  const selectedKey = location.pathname.split('/')[2] || 'bought'

  const handleMenuClick = (e) => {
    nav(`/order/${e.key}`)
  };

  useEffect(() => {
    nav(`/order/bought`);
  }, [nav])

  const renderContent = () => {
    switch (selectedKey) {
      case 'bought':
        return <Bought />;
      case 'canceled':
        return <Canceled />;
      case 'delivered':
        return <Delivered />;
      case 'ordered':
        return <Ordered />;
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

          <Menu.Item className='relative' key="bought" >
            <div className='flex justify-between items-center w-[94%]' >
              <div>
                Chưa duyệt
              </div>

            </div>
          </Menu.Item>
          <Menu.Item className='relative' key="canceled" >
            <div className=' flex justify-between items-center w-[94%]' >
              <div>
                Đã hủy
              </div>

            </div>
          </Menu.Item>
          <Menu.Item className='relative' key="delivered">

            <div className='flex justify-between items-center w-[94%]' >
              <div >
                Trạng thái vận chuyển
              </div>

            </div>
          </Menu.Item>
          <Menu.Item className='relative' key="rates" >

            <div className='flex justify-between items-center w-[94%]' >
              <div>
                Đánh giá
              </div>

            </div>
          </Menu.Item>
          <Menu.Item className='relative' key="ordered" >

            <div className='flex justify-between items-center w-[94%]' >
              <div>
                Đơn đã mua
              </div>

            </div>
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
