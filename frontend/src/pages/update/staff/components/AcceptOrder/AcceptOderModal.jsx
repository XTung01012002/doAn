import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateShipInfo } from '../../../../../store/shipinfo/ShipInfoCreate';

const AcceptOderModal = ({ open, setOpen, id }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.createShipInfo.loading)
    const sub = useSelector((state) => state.createShipInfo.sub)
    const error = useSelector((state) => state.createShipInfo.error)
    const handleSubmit = (values) => {
        if (values.deliveryDate) {
            values.deliveryDate = values.deliveryDate.format('YYYY-MM-DD');
        }
        if (values.shippingFee) {
            values.shippingFee = parseFloat(values.shippingFee.replace(/,/g, ''));
        }
        console.log("values:::", values.shippingFee);
        console.log('Form data:', id,values);
      // dispatch(CreateShipInfo({id, values}))
      dispatch(CreateShipInfo({ id, values: form.getFieldsValue() }));
      

    };

    useEffect(() => {
        if (sub) {
            setOpen(false)
        }
    }, [sub, setOpen])

    return (
        <>
            {error ?
                <>Lỗi API</>
                :
                <Modal
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    footer={false}
                    closeIcon={false}
                    width={600}
                >
                    <div className='text-[20px] font-bold text-center pb-5'>
                        Xác nhận đơn hàng
                    </div>
                    <Form
                        name='basic'
                        form={form}
                        onFinish={handleSubmit}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                    >
                        <Form.Item
                            label="Mã vận chuyển"
                            name='maVanDon'
                            rules={[
                                { required: true, message: 'Vui lòng nhập mã vận chuyển!' },
                            ]}
                        >
                            <Input placeholder="Nhập mã vận chuyển" />
                        </Form.Item>

                        <Form.Item
                            label="Phương thức vận chuyển"
                            name="shippingMethod"
                            rules={[
                                { required: true, message: 'Vui lòng chọn phương thức vận chuyển!' },
                            ]}
                        >
                            <Select placeholder="Chọn phương thức vận chuyển">
                                <Select.Option value="Chuyển phát nhanh">Chuyển phát nhanh</Select.Option>
                                <Select.Option value="Chuyển phát tiêu chuẩn">Chuyển phát tiêu chuẩn</Select.Option>
                                <Select.Option value="Giao hàng tiết kiệm">Giao hàng tiết kiệm</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Ngày giao hàng"
                            name="deliveryDate"
                            rules={[
                                { required: true, message: 'Vui lòng chọn ngày giao hàng!' },
                            ]}
                        >
                            <DatePicker
                                placeholder="Chọn ngày giao hàng"
                                style={{ width: '100%' }}
                                format="DD-MM-YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Phí vận chuyển"
                            name='shippingFee'
                            rules={[
                                { required: true, message: 'Vui lòng nhập phí vận chuyển!' },
                            ]}
                        >
                            <Input placeholder="Nhập phí vận chuyển" />
                        </Form.Item>

                        <Form.Item className='flex justify-end'>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                            >
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            }
        </>
    );
};

export default AcceptOderModal;
