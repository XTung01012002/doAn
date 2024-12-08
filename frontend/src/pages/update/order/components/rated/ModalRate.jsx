
import { Avatar, Divider, Modal, Rate, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommnetOrder } from '../../../../../store/delivered/modeldeli';
import { GetRate } from '../../../../../store/rate/getRate';
import CustomNotification from '../../../../../components/notification/CustomNotifacation';

const { TextArea } = Input;

const ModalRate = ({ open, setOpen, data }) => {
    const dispatch = useDispatch()
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const [open1, setOpen1] = useState(false)
    const sub = useSelector(state => state.createComment.sub)
    const error = useSelector(state => state.createComment.error)

    const handleRateChange = (value, product) => {
        setSelectedProduct(product);
        setRating(value);
        setOpen1(true);
    };
    // code moi
    const handleSubmit = () => {
        const comment = {
            comment: reviewContent,
            rate: rating
        }
        dispatch(CommnetOrder({ id: selectedProduct.productId._id, data: comment }))
    };

    useEffect(() => {
        if (sub) {
            setReviewContent('');
            setRating(0);
            dispatch(GetRate())
            setOpen1(false);
        }
    }, [sub])

    return (
        <>
            <CustomNotification
                success={sub && 'Gửi bình luận thành công'}
                error={error}
            />
            <Modal
                title={
                    <>
                        <div className='text-center'>Danh sách sản phẩm</div>
                        <Divider />
                    </>
                }
                open={open}
                onCancel={() => setOpen(false)}
                footer={false}
                centered
            >
                {
                    data.length > 0 &&
                    data.map((item, index) => (
                        <div className='flex w-full ml-6 mb-6' key={index}>
                            <Avatar
                                src={item?.productId?.productImage[0]}
                                shape="square"
                                size={150}
                                className='mr-4'
                            />
                            <div className='w-full mt-5'>
                                <div className='font-bold text-[16px]'>{item.productId.productName}</div>
                                <div className='text-sm my-2'>
                                    <span className='font-medium mr-[35px]'>Phân loại: </span>
                                    {item.productId.category}
                                </div>
                                <div className='text-sm '>
                                    <span className='font-medium mr-3 '>Thương hiệu: </span>
                                    {item.productId.brandName}
                                </div>
                                <div className='mt-2 flex items-center'>
                                    <span className='font-medium mr-[35px]'>Đánh giá: </span>
                                    <Rate
                                        onChange={(value) => handleRateChange(value, item)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Modal>

            <Modal
                title={
                    <>
                        <div className='text-center'>Đánh giá sản phẩm</div>
                        <Divider />
                    </>
                }
                open={open1}
                onCancel={() => setOpen1(false)}
                footer={false}
                centered
            >
                {selectedProduct && (
                    <>
                        <div className='flex w-full mb-4'>
                            <Avatar
                                src={selectedProduct?.productId?.productImage[0]}
                                shape="square"
                                size={100}
                                className='mr-4'
                            />
                            <div className='w-full'>
                                <div className='font-bold text-lg'>{selectedProduct.productId.productName}</div>
                                <div className='text-sm text-[#B0B3B8]'>Phân loại: {selectedProduct.productId.category}</div>
                                <div className='text-sm'>Thương hiệu: {selectedProduct.productId.brandName}</div>
                            </div>
                        </div>
                        <Divider />
                        <div className='mb-4 flex items-center'>
                            <p className='font-semibold mr-4'>Đánh giá</p>
                            <Rate value={rating} onChange={(value) => setRating(value)} />
                        </div>
                        <div className='mb-4'>
                            <TextArea
                                placeholder="Nhập nội dung đánh giá..."
                                rows={4}
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                            />
                        </div>
                        <div className='text-right'>
                            <Button type="primary" onClick={handleSubmit}>
                                Gửi đánh giá
                            </Button>
                        </div>
                    </>
                )}
            </Modal>


        </>
    );
};

export default ModalRate;






