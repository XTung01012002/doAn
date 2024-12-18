import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllInfoShipOrder } from '../../../../../store/shipinfo/GetAllOrderShipInfo';
import { Select, Table, Tag, Modal, Button } from 'antd';
import formatAmount from '../../../../../components/formatNumber/FormatNumber';
import { setError, setSub, UpdateShippingStatus } from '../../../../../store/staff/UpdateShipping';
import CustomNotification from '../../../../../components/notification/CustomNotifacation';

const { Option } = Select;

const AcceptedOrder = () => {

    const dispatch = useDispatch();
    const dataSource = useSelector(state => state.getAllShipInfo.data)
    useEffect(() => {
        dispatch(GetAllInfoShipOrder())
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [initialStatus, setInitialStatus] = useState(null);
    const pageSize = 10;

    const loading = useSelector(state => state.updateShipping.loading)
    const sub = useSelector(state => state.updateShipping.sub)
    const error = useSelector(state => state.updateShipping.error)

    const handleChange = (record, value) => {
        if (value === 'Đã giao') {
            setSelectedRecord(record);
            setInitialStatus(record.shippingStatus);
            setIsModalOpen(true); 
        } else {
            updateShippingStatus(record, value);
        }
    }

    const updateShippingStatus = (record, value) => {
        const data = { shippingStatus: value }
        dispatch(UpdateShippingStatus({ id: record._id, data }));
    }

    const handleConfirm = () => {
        if (selectedRecord) {
            updateShippingStatus(selectedRecord, 'Đã giao');
        }
        setIsModalOpen(false);
        setSelectedRecord(null);
        setInitialStatus(null);
    }

    const handleCancel = () => {
        if (selectedRecord) {
            const updatedDataSource = dataSource.map(item =>
                item._id === selectedRecord._id
                    ? { ...item, shippingStatus: initialStatus }
                    : item
            );
            dispatch(GetAllInfoShipOrder(updatedDataSource));
        }
        setIsModalOpen(false);
        setSelectedRecord(null);
        setInitialStatus(null);
    }

    useEffect(() => {
        if (sub) {
            dispatch(setSub())
            dispatch(GetAllInfoShipOrder())
        }
    }, [sub, dispatch])

    useEffect(() => {
        if (error) {
            dispatch(setError())
        }
    }, [error, dispatch])

    const columns = [
        {
            key: '_id',
            dataIndex: '_id',
            title: 'STT',
            render: (_text, _record, index) => {
                return (currentPage - 1) * pageSize + index + 1
            }
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày tạo',
            render: (createdAt) => {
                return createdAt ? new Date(createdAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }) : '';
            }
        },
        {
            key: 'deliveryDate',
            dataIndex: 'deliveryDate',
            title: 'Dự kiến giao hàng',
            render: (deliveryDate) => {
                return deliveryDate ? new Date(deliveryDate).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }) : '';
            }
        },
        {
            key: 'maVanDon',
            dataIndex: 'maVanDon',
            title: 'Mã vận đơn'
        },
        {
            key: 'shippingMethod',
            dataIndex: 'shippingMethod',
            title: 'Hình thức vận chuyển'
        },
        {
            key: 'paymentInfoStatus',
            dataIndex: 'paymentInfo',
            title: 'Thanh toán',
            render: (paymentInfo) => (
                <Tag color={
                    paymentInfo?.paymentStatus === 'Chưa thanh toán'
                        ? 'error'
                        : paymentInfo?.paymentStatus === 'Đã thanh toán'
                            ? 'blue'
                            : paymentInfo?.paymentStatus === 'thanh toán khi nhận hàng'
                                ? 'cyan'
                                : 'error'
                }>
                    {paymentInfo?.paymentStatus || 'Chưa chọn phương thức thanh toán'}
                </Tag>
            )
        },
        {
            key: 'totalAmount',
            dataIndex: 'totalAmount',
            title: 'Giá tiền',
            render: (totalAmount) => `${formatAmount(totalAmount)} đ`  
        },
        {
            key: 'shippingStatus', 
            dataIndex: 'shippingStatus',
            title: 'Trạng thái đơn',
            render: (shippingStatus) => (
                <Tag color={
                    shippingStatus === 'Đã hủy' ? 'error'
                        : shippingStatus === 'Đã lấy hàng' ? 'cyan'
                            : shippingStatus === 'Đang giao' ? 'geekblue'
                                : 'blue'
                }>
                    {shippingStatus}
                </Tag>
            )
        },
        {
            key: 'shippingStatus',
            title: 'Xác nhận',
            dataIndex: 'shippingStatus',
            render: (text, record) => (
                <Select
                    value={record.shippingStatus}
                    style={{ width: 150 }}
                    loading={loading}
                    onChange={(value) => handleChange(record, value)}
                    disabled={text === 'Đã giao'}
                >
                    <Option value='Đã lấy hàng'>Đã lấy hàng</Option>
                    <Option value='Đang giao'>Đang giao</Option>
                    <Option value='Đã giao'>Đã giao</Option>
                    <Option value='Đã hủy'>Đã hủy</Option>
                </Select>
            ),
        },
    ];

    return (
        <div>
            <CustomNotification success={sub && 'Cập nhập thành công'} error={error} />
            <div className='mb-2 text-[18px] font-bold'>
                Danh sách đơn hàng đã duyệt
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    pageSize: pageSize,
                    current: currentPage,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
            <Modal
                title="Xác nhận giao hàng"
                open={isModalOpen}
                onOk={handleConfirm}
                centered
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Hủy</Button>,
                    <Button key="confirm" type="primary" onClick={handleConfirm}>Xác nhận</Button>,
                ]}
            >
                <p>Bạn có chắc chắn muốn xác nhận đơn hàng này "Đã giao"?</p>
            </Modal>
        </div>
    )
}

export default AcceptedOrder;
