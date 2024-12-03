import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'; 
import { GetStatistical } from '../../../../../store/admin/PageAdmin/getStatistical';
import { Card, DatePicker } from "antd";
import { BarChartOutlined, ShoppingCartOutlined, LineChartOutlined } from "@ant-design/icons";

const formatNumber = (num) =>
    Number(num).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const Statistical = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.getStatistical.data)

    const date = dayjs();
    const twoMonthsBeforeToday = dayjs().subtract(1, 'month');

    const [startDate, setStartDate] = useState(twoMonthsBeforeToday.format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(date.format('YYYY-MM-DD'));

    useEffect(() => {
        const dateApi = {
            startDate,
            endDate
        };
        dispatch(GetStatistical(dateApi));
    }, [dispatch, endDate, startDate]);

    const handleStartDateChange = (date, dateString) => {
        setStartDate(dateString);
    };

    const handleEndDateChange = (date, dateString) => {
        setEndDate(dateString);
    };

    return (
        <>
            <div className="mb-6 flex gap-4 justify-end">
                <DatePicker
                    onChange={handleStartDateChange}
                    defaultValue={twoMonthsBeforeToday}
                    format="YYYY-MM-DD"
                    placeholder="Chọn ngày bắt đầu"
                />
                <DatePicker
                    onChange={handleEndDateChange}
                    defaultValue={date}
                    format="YYYY-MM-DD"
                    placeholder="Chọn ngày kết thúc"
                />
            </div>
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
            {/* <Card className='mt-2'>
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
            </Card> */}
        </>
    )
}

export default Statistical;
