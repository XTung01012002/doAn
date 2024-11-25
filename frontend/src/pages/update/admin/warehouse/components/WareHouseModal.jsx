import { Badge, Button, Form, Input, message, Modal, Select, Space, Steps, Table, theme } from 'antd';
import React, { useState } from 'react';
import Step2 from './StepModalAdd/Step2';
import Step1 from './StepModalAdd/Step1';
import { LoadingOutlined } from '@ant-design/icons';
import Step3 from './StepModalAdd/Step3';




const WareHouseModal = ({ open, setOpen }) => {

    const handleClose = () => {
        setOpen(false)
    }
    const [data, setData] = useState({})

    console.log('datamerge: ', data);


    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: 'Thông tin phiếu',
            content: <Step1 current={current} setCurrent={setCurrent} data={data} setData={setData} />,
        },
        {
            title: 'Danh sách sản phẩm',
            content: <Step2 current={current} setCurrent={setCurrent} data={data} setData={setData} />,
        },
        {
            title: 'Thành công',
            content: <Step3 setData={setData} setOpen={setOpen} setCurrent={setCurrent} />,
        },
    ];
    const items = steps.map((item, index) => ({
        key: item.title,
        title: item.title,
        status: index === current ? 'process' : index > current ? 'wait' : 'finish',
        // icon: index === current && loading ? <LoadingOutlined /> : null,
    }));


    return (
        <Modal
            open={open}
            onOk={handleClose}
            onCancel={handleClose}
            centered
            title={<div className='text-center'>Nhập hàng</div>}
            footer={false}
            closeIcon={false}
            width={900}
        >
            <Steps current={current} items={items} />
            <div className='mt-4'>{steps[current].content}</div>

        </Modal>
    );
};

export default WareHouseModal;
