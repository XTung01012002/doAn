import { Avatar, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import accept from '../../../../../../assest/accepted.png'
const Step3 = ({ setData, setOpen, setCurrent }) => {

  const [count, setCount] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          setData({})
          setCurrent(0)
          setOpen(false)
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='flex justify-center mt-10'>
        <Avatar
          src={accept}
          shape="square"
          size={400}
        />
      </div>
      <div className='text-center mt-2'>
        <p className='font-semibold'>
          Tạo phiếu nhập hàng thành công!
        </p>
        <p>
          Tự đóng sau {count} giây.
        </p>
      </div>
      <div className='flex justify-end'>
        <Button
          color='primary'
          variant='solid'
          onClick={() => setOpen(false)}
        >
          Hoàn thành
        </Button>
      </div>
    </>
  )
}

export default Step3
