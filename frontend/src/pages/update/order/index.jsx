import React, { useEffect, useState } from 'react'
import { Badge, Layout, Menu } from 'antd';
import Bought from './components/bought/Bought';
import Canceled from './components/canceled/Canceled';
import Delivered from './components/delivered/delivered';
import Rates from './components/rated/Rates';
import styles from './Order.module.css';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetRate } from '../../../store/rate/getRate';
import { GetDelivered } from '../../../store/delivered/Delivered';
import { fetchDataCanceledUser } from '../../../store/canceled/CanceledUser';
import { fetchDataBoughtUser } from '../../../store/bought/BoughtUser';

const { Sider, Content } = Layout;

const OrderPage = () => {

  // const dispatch = useDispatch()

  // const countBought = useSelector(state => state.bought.data)
  // const countCancel = useSelector(state => state.cancel.data)
  // const countdeliver = useSelector(state => state.getDeliver.data)
  // const countRate = useSelector(state => state.getRate.data)

  // useEffect(() => {
  //   dispatch(fetchDataBoughtUser());
  //   dispatch(fetchDataCanceledUser())
  //   dispatch(GetDelivered())
  //   dispatch(GetRate())
  // }, [dispatch])

  
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

          <Menu.Item className='relative' key="bought" icon={<UserOutlined />}>
            <div className='flex justify-between items-center w-[94%]' >
              <div>
                Chưa duyệt
              </div>
              {/* <div className='absolute top-[-10px] right-3 '>
                <Badge count={countBought.length} offset={[10, 0]} />
              </div> */}
            </div>
          </Menu.Item>
          <Menu.Item className='relative' key="canceled" icon={<AppstoreAddOutlined />}>
            <div className=' flex justify-between items-center w-[94%]' >
              <div>
                Đã hủy
              </div>
              {/* <div className='absolute top-[-10px] right-3 '>
                <Badge count={countCancel.length} offset={[10, 0]} />
              </div> */}
            </div>
          </Menu.Item>
          <Menu.Item className='relative'  key="delivered" icon={<AppstoreAddOutlined />}>

            <div className='flex justify-between items-center w-[94%]' >
              <div >
                Trạng thái vận chuyển
              </div>
              {/* <div className='absolute top-[-10px] right-3 '>
                <Badge count={countdeliver.length} offset={[10, 0]} />
              </div> */}
            </div>
          </Menu.Item>
          <Menu.Item className='relative' key="rates" icon={<FileTextOutlined />}>

            <div className='flex justify-between items-center w-[94%]' >
              <div>
                Đánh giá
              </div>
              {/* <div className='absolute top-[-10px] right-3 '>
                <Badge count={countRate.length} offset={[10, 0]} />
              </div> */}
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
