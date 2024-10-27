import React from 'react'
import { Tabs } from 'antd';
import Bought from './components/bought/Bought';
import Canceled from './components/canceled/Canceled';
import Delivered from './components/delivered/delivered';
import Rates from './components/rated/Rates';



const items = [
  {
    key: '1',
    label: <span className='text-[16px] ' > Đơn đã đặt</span>,
    children: <Bought />,
  },
  {
    key: '2',
    label: <span className='text-[16px] ' > Đã hủy</span>,
    children: <Canceled />,
  },
  {
    key: '3',
    label: <span className='text-[16px] ' > Đang vận chuyển</span>,
    children: <Delivered />,
  },
  {
    key: '4',
    label: <span className='text-[16px] '>Đánh giá</span>,
    children: <Rates />,
  },
];

const OrderPage = () => {
  return (
    <div className='container mx-auto px-80 py-10'>
      <Tabs
        defaultActiveKey="1"
        items={items}
      />
    </div>
  )
}

export default OrderPage
