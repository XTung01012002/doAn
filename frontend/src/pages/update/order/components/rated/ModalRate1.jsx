
import { Avatar, Divider, Modal, Rate, Input, Button } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

const ModalRate1 = ({ open, setOpen, data }) => {
    const [rating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const productDetal = data[0]
    const handleSubmit = () => {
        // Gửi đánh giá (rating và reviewContent) của sản phẩm `selectedProduct`.
        console.log('Submitted review:', { product: data, rating, content: reviewContent });
        // Reset form sau khi submit.
        setReviewContent('');
        setRating(0);
        setOpen(false);
    };
    // code moi
    
    return (
        <>
            <Modal
                title={
                    <>
                        <div className='text-center'>Đánh giá sản phẩm</div>
                        <Divider />
                    </>
                }
                open={open}
                onCancel={() => setOpen(false)}
                footer={false}
                centered
            >
                {productDetal && (
                    <>
                        <div className='flex w-full mb-4'>
                            <Avatar
                                src={productDetal?.productId?.productImage[0]}
                                shape="square"
                                size={100}
                                className='mr-4'
                            />
                            <div className='w-full'>
                                <div className='font-bold text-lg'>{productDetal.productId.productName}</div>
                                <div className='text-sm text-[#B0B3B8]'>Phân loại: {productDetal.productId.category}</div>
                                <div className='text-sm'>Thương hiệu: {productDetal.productId.brandName}</div>
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

export default ModalRate1;






