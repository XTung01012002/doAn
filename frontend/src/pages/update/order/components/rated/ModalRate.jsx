
import { Avatar, Divider, Modal, Rate, Input, Button } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

const ModalRate = ({ open, setOpen, data }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const [open1, setOpen1] = useState(false)


    const handleRateChange = (value, product) => {
        setSelectedProduct(product);
        setRating(value);
        setOpen1(true);
    };

    const handleSubmit = () => {
        // Gửi đánh giá (rating và reviewContent) của sản phẩm `selectedProduct`.
        console.log('Submitted review:', { product: selectedProduct, rating, content: reviewContent });
        // Reset form sau khi submit.
        setReviewContent('');
        setRating(0);
        setOpen1(false);
    };

    return (
        <>
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
                        <div className='flex w-full mb-6' key={index}>
                            <Avatar
                                src={item?.productId?.productImage[0]}
                                shape="square"
                                size={100}
                                className='mr-4'
                            />
                            <div className='w-full'>
                                <div className='font-bold'>{item.productId.productName}</div>
                                <div className='text-sm'>Phân loại: {item.productId.category}</div>
                                <div className='text-sm'>Thương hiệu: {item.productId.brandName}</div>
                                <div className='mt-2'>
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
                        <div className='mb-4'>
                            <p className='font-semibold mb-2'>Đánh giá</p>
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






