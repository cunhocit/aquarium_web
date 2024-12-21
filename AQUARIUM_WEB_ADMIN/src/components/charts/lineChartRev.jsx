/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const selectedMonth = (month) => {
    switch (month) {
        case 1: return 'Tháng 1';
        case 2: return 'Tháng 2';
        case 3: return 'Tháng 3';
        case 4: return 'Tháng 4';
        case 5: return 'Tháng 5';
        case 6: return 'Tháng 6';
        case 7: return 'Tháng 7';
        case 8: return 'Tháng 8';
        case 9: return 'Tháng 9';
        case 10: return 'Tháng 10';
        case 11: return 'Tháng 11';
        case 12: return 'Tháng 12';
        default: return 'Invalid month';
    }
}

export const selectedWeek = (day) => {
    switch (day) {
        case 0: return 'Thứ 2';
        case 1: return 'Thứ 3';
        case 2: return 'Thứ 4';
        case 3: return 'Thứ 5';
        case 4: return 'Thứ 6';
        case 5: return 'Thứ 7';
        case 6: return 'Chủ nhật';
        default: return 'Invalid month';
    }
}

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(value);
};

export default function LineChartRevenue({revenues}) {
    const [chartType, setChartType] = useState('month');

    const currentMonth = (new Date()).getMonth() + 1;
    const currentYear = (new Date()).getFullYear();

    const getCurMonth = (date) => {
        return ((new Date(date)).getMonth() + 1);
    }

    const monthRev = [
        { month: 'Tháng 1', revenue_: 0 },
        { month: 'Tháng 2', revenue_: 0 },
        { month: 'Tháng 3', revenue_: 0 },
        { month: 'Tháng 4', revenue_: 0 },
        { month: 'Tháng 5', revenue_: 0 },
        { month: 'Tháng 6', revenue_: 0 },
        { month: 'Tháng 7', revenue_: 0 },
        { month: 'Tháng 8', revenue_: 0 },
        { month: 'Tháng 9', revenue_: 0 },
        { month: 'Tháng 10', revenue_: 0 },
        { month: 'Tháng 11', revenue_: 0 },
        { month: 'Tháng 12', revenue_: 0 },
    ];

    const weekRev = [
        { day: 'Thứ 2', revenue_: 0 },
        { day: 'Thứ 3', revenue_: 0 },
        { day: 'Thứ 4', revenue_: 0 },
        { day: 'Thứ 5', revenue_: 0 },
        { day: 'Thứ 6', revenue_: 0 },
        { day: 'Thứ 7', revenue_: 0 },
        { day: 'Chủ nhật', revenue_: 0 },
    ];

    try {
        revenues.map(rev => {
            let rev_created_at = new Date(rev.created_at);
            let rev_created_day = selectedWeek(rev_created_at.getDay());
            let rev_created_month = getCurMonth(rev.created_at);
            let rev_created_year = rev_created_at.getFullYear();

            if (currentYear === rev_created_year) {
                monthRev.map(e => {
                    if (e.month === selectedMonth(rev_created_month)) {
                        e.revenue_ += rev.revenue;
                    }
                });
                
                weekRev.map(e => {
                    if (e.day === rev_created_day  && currentMonth === rev_created_month){
                        e.revenue_ += rev.revenue;
                    }
                });
            }
        });
    }catch (error) {
        console.log(error);
        throw error;
    }

    return (
        <div className="wrap-revenue-chart">
            
            <div className="revenue-chart-header">
                <h3>Doanh thu</h3>
                <select className="selectValueLineChart" name="" id=""
                    value={chartType}
                    onChange={e => setChartType(e.target.value)}
                >
                    <option value='month'>Tháng</option>
                    <option value='week'>Tuần</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height='80%'>
                <LineChart data={ chartType === 'week' ? weekRev : monthRev } 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="0 2" />
                    <XAxis dataKey={ chartType === 'week' ? 'day' : 'month' }  fontSize={'0.7rem'}/>
                    <YAxis fontSize={'0.7rem'}/>
                    <Tooltip  formatter={(value) => formatCurrency(value)} />
                    <Legend 
                        iconType="square" 
                        wrapperStyle={{
                            fontSize: '0.8rem', 
                            fontWeight: 500,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />

                    <Line 
                        type="monotone" 
                        dataKey="revenue_" 
                        stroke="#000103c7"
                        name='Doanh thu'
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}