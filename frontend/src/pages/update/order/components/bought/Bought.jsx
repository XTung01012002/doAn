import React, { useEffect } from 'react'
import { BoughtData } from './BoughtData'
import { Avatar, Button, Card, Col, Image, Row } from 'antd'
import styles from '../CustomScrollY.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataBoughtUser } from '../../../../../store/bought/BoughtUser'
import SummaryApi from '../../../../../common'





const Bought = () => {


    const dispatch = useDispatch();

    const data = useSelector((state) => state.bought.data)


    useEffect(() => {
        dispatch(fetchDataBoughtUser())
    }, [dispatch])
    console.log('databought: ', data);

    // const fetchData = async () => {
    //     const dataResponse = await fetch(SummaryApi.getAllNotConfirm.url, {
    //         method: SummaryApi.getAllNotConfirm.method,
    //         credentials: "include",
    //     });
    //     const dataApi = await dataResponse.json();
    //     // setData(dataApi.data);
    //     console.log('databought: ',dataApi.data);
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);




    return (
        <div className={styles.customScrollbar}>
            <Row gutter={[16, 24]}>
                {BoughtData?.map((item, index) => {
                    return (
                        <Col className="gutter-row " span={24} key={index}>
                            <Card>
                                <Row gutter={[16, 24]}>
                                    <Col className='gutter-row' span={6}>
                                        <Avatar
                                            shape="square"
                                            size={150}
                                            icon={
                                                <Image
                                                    src={item.img}
                                                />
                                            }
                                        />
                                    </Col>
                                    <Col className='gutter-row' span={18}>
                                        <Row gutter={[16, 24]} className='flex items-center'>
                                            <Col className='gutter-row' span={24} >
                                                <Row gutter={[16, 24]}>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center'>
                                                            <Col className='gutter-row' span={24}>
                                                                <span className='text-[16px]'>{item.name}</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center'>
                                                            <Col className='gutter-row' span={12}>
                                                                <span className='text-[16px]'>{item.price.toLocaleString('vi-VN')} đ</span>
                                                            </Col>
                                                            <Col className='gutter-row flex justify-end' span={12}>
                                                                <span className='text-[16px]'>x {' '}{item.quantity}</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className='gutter-row' span={24} >
                                                <Row gutter={[16, 24]}>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                                            <Col className='gutter-row flex items-center justify-end' span={24}>
                                                                <span className='text-[16px] '>{item.quantity} mặt hàng: </span> <span className='text-[16px] ml-1 font-medium'>{item.total.toLocaleString('vi-VN')} đ</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='gutter-row' span={24}>
                                                        <Row gutter={[16, 24]} className='flex items-center justify-end'>
                                                            <Col className='gutter-row flex items-center justify-end' span={24} >
                                                                <Button
                                                                    color={item.status ? 'primary' : 'danger'}
                                                                    variant="solid"
                                                                >
                                                                    {item.status ? 'Đã thanh toán' : 'Chưa thanh toán'}

                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Bought


// import React, { useState } from 'react'
// import { BoughtData } from './BoughtData'
// import { Avatar, Button, Card, Col, Image, Row } from 'antd'
// import styles from '../CustomScrollY.module.css'

// const Bought = () => {
//     const [expandedIndex, setExpandedIndex] = useState(null)

//     return (
//         <div className={styles.customScrollbar}>
//             <Row gutter={[16, 24]}>
//                 {BoughtData?.map((items, index) => {
//                     const isExpanded = expandedIndex === index
//                     const displayItems = isExpanded ? items : [items[0]]

//                     return (
//                         <Col className="gutter-row" span={24} key={index}>
//                             <Card>
//                                 {displayItems.map((item, itemIndex) => (
//                                     <Row gutter={[16, 24]} key={itemIndex}>
//                                         <Col className='gutter-row' span={6}>
//                                             <Avatar
//                                                 shape="square"
//                                                 size={150}
//                                                 icon={<Image src={item.img} />}
//                                             />
//                                         </Col>
//                                         <Col className='gutter-row' span={18}>
//                                             <Row gutter={[16, 24]} className='flex items-center'>
//                                                 <Col className='gutter-row' span={24}>
//                                                     <Row gutter={[16, 24]}>
//                                                         <Col className='gutter-row' span={24}>
//                                                             <Row gutter={[16, 24]} className='flex items-center'>
//                                                                 <Col className='gutter-row' span={24}>
//                                                                     <span className='text-[16px]'>{item.name}</span>
//                                                                 </Col>
//                                                             </Row>
//                                                         </Col>
//                                                         <Col className='gutter-row' span={24}>
//                                                             <Row gutter={[16, 24]} className='flex items-center'>
//                                                                 <Col className='gutter-row' span={12}>
//                                                                     <span className='text-[16px]'>{item.price.toLocaleString('vi-VN')} đ</span>
//                                                                 </Col>
//                                                                 <Col className='gutter-row flex justify-end' span={12}>
//                                                                     <span className='text-[16px]'>x {item.quantity}</span>
//                                                                 </Col>
//                                                             </Row>
//                                                         </Col>
//                                                     </Row>
//                                                 </Col>
//                                                 <Col className='gutter-row' span={24}>
//                                                     <Row gutter={[16, 24]}>
//                                                         <Col className='gutter-row' span={24}>
//                                                             <Row gutter={[16, 24]} className='flex items-center justify-end'>
//                                                                 <Col className='gutter-row flex items-center justify-end' span={24}>
//                                                                     <span className='text-[16px]'>{item.quantity} mặt hàng: </span>
//                                                                     <span className='text-[16px] ml-1 font-medium'>{item.total.toLocaleString('vi-VN')} đ</span>
//                                                                 </Col>
//                                                             </Row>
//                                                         </Col>
//                                                         <Col className='gutter-row' span={24}>
//                                                             <Row gutter={[16, 24]} className='flex items-center justify-end'>
//                                                                 <Col className='gutter-row flex items-center justify-end' span={24}>
//                                                                     <Button
//                                                                         color={item.status ? 'primary' : 'danger'}
//                                                                         variant="solid"
//                                                                     >
//                                                                         {item.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
//                                                                     </Button>
//                                                                 </Col>
//                                                             </Row>
//                                                         </Col>
//                                                     </Row>
//                                                 </Col>
//                                             </Row>
//                                         </Col>
//                                     </Row>
//                                 ))}
//                                 {items.length > 1 && !isExpanded && (
//                                     <Row className="flex justify-end mt-2">
//                                         <Button onClick={() => setExpandedIndex(index)}>
//                                             Xem thêm
//                                         </Button>
//                                     </Row>
//                                 )}
//                                 {isExpanded && (
//                                     <Row className="flex justify-end mt-2">
//                                         <Button onClick={() => setExpandedIndex(null)}>
//                                             Thu gọn
//                                         </Button>
//                                     </Row>
//                                 )}
//                             </Card>
//                         </Col>
//                     )
//                 })}
//             </Row>
//         </div>
//     )
// }

// export default Bought
