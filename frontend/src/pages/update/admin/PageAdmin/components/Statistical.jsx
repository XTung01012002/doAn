import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetStatistical } from '../../../../../store/admin/PageAdmin/getStatistical';
import { format } from 'date-fns';
import { Card } from "antd";
import { BarChartOutlined, ShoppingCartOutlined, LineChartOutlined } from "@ant-design/icons";
import {  XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from 'recharts';

const formatNumber = (num) =>
    Number(num).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const Statistical = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.getStatistical.data)

    const date = new Date();
    const twoMonthsBeforeToday = new Date(date);
    twoMonthsBeforeToday.setMonth(date.getMonth() - 2);

    const [startDate, setStartDate] = useState(format(new Date(twoMonthsBeforeToday), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    console.log('data', startDate, endDate);
    console.log('data1', data);



    useEffect(() => {
        const dateApi = {
            startDate: "2024-10-01",
            endDate: "2024-10-29"
        };
        dispatch(GetStatistical(dateApi));
    }, [dispatch, endDate, startDate]);


    const chartData = [
        { name: "Doanh thu", value: data.totalRevenue },
        { name: "Số lượng đã bán", value: data.totalQuantity },
        { name: "Lợi nhuận", value: data.totalProfit },
        { name: "Giá trị hàng tồn", value: data.totalAmountInventory },
        { name: "Phí vận chuyển", value: data.totalShippingFee }
    ];



    return (
        
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card
                    className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white rounded-lg"
                    title="Tổng doanh thu"
                    bordered={false}
                >
                    <div className="flex items-center">
                        <BarChartOutlined className="text-blue-500 text-3xl mr-4" />
                        <div>
                            <p className="text-lg font-semibold">{formatNumber(data.totalRevenue)}</p>
                        </div>
                    </div>
                </Card>

                <Card
                    className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white rounded-lg"
                    title="Tổng số lượng đã bán"
                    bordered={false}
                >
                    <div className="flex items-center">
                        <ShoppingCartOutlined className="text-green-500 text-3xl mr-4" />
                        <div>
                            <p className="text-lg font-semibold">{data.totalQuantity}</p>
                        </div>
                    </div>
                </Card>

                <Card
                    className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white rounded-lg"
                    title="Tổng lợi nhuận"
                    bordered={false}
                >
                    <div className="flex items-center">
                        <LineChartOutlined className={`${data.totalProfit < 0 ? " text-red-500" : "text-green-500"} text-3xl mr-4`} />
                        <div>
                            <p className={`text-lg font-semibold ${data.totalProfit < 0 ? "text-red-500" : "text-green-500"}`}>
                                {formatNumber(data.totalProfit)}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card
                    className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white rounded-lg"
                    title="Tổng giá trị hàng tồn"
                    bordered={false}
                >
                    <div className="flex items-center">
                        <BarChartOutlined className="text-orange-500 text-3xl mr-4" />
                        <div>
                            <p className="text-lg font-semibold">{formatNumber(data.totalAmountInventory)}</p>
                        </div>
                    </div>
                </Card>

                <Card
                    className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white rounded-lg"
                    title="Tổng phí vận chuyển"
                    bordered={false}
                >
                    <div className="flex items-center">
                        <ShoppingCartOutlined className="text-purple-500 text-3xl mr-4" />
                        <div>
                            <p className="text-lg font-semibold">{formatNumber(data.totalShippingFee)}</p>
                        </div>
                    </div>
                </Card>
               
            </div>
            <Card className='mt-2'>
                <LineChart
                    width={1300}
                    height={350}
                    data={chartData}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatNumber(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
            </Card>
        </>

    )
}

export default Statistical


