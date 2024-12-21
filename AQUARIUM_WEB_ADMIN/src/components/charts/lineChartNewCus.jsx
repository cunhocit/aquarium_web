/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { selectedWeek, selectedMonth } from './lineChartRev';

const dataMonth = [
    { month: 'Tháng 1', count: 0 },
    { month: 'Tháng 2', count: 0 },
    { month: 'Tháng 3', count: 0 },
    { month: 'Tháng 4', count: 0 },
    { month: 'Tháng 5', count: 0 },
    { month: 'Tháng 6', count: 0 },
    { month: 'Tháng 7', count: 0 },
    { month: 'Tháng 8', count: 0 },
    { month: 'Tháng 9', count: 0 },
    { month: 'Tháng 10', count: 0 },
    { month: 'Tháng 11', count: 0 },
    { month: 'Tháng 12', count: 0 },
];
const dataWeek = [
    { week: 'Thứ 2', count: 0 },
    { week: 'Thứ 3', count: 0 },
    { week: 'Thứ 4', count: 0 },
    { week: 'Thứ 5', count: 0 },
    { week: 'Thứ 6', count: 0 },
    { week: 'Thứ 7', count: 0 },
    { week: 'Chủ nhật', count: 0 },
];

const currentMonth = (new Date()).getMonth() + 1;
const currentYear = (new Date()).getFullYear();

export function LineChartNewCustomers({customers}) {
    const [ chartType , setChartType ] = useState('month');
    
    customers?.map(e => {
        let customer_create_at = new Date(e.created_at);
        let create_at_month = selectedMonth(customer_create_at.getMonth() + 1);
        let create_at_year = customer_create_at.getFullYear();

        if (currentYear === create_at_year) {
            // month
            dataMonth.map(d => {
                if (d.month === create_at_month) {
                    d.count++;
                }
            });
    
            // week 
            dataWeek.map(dw => {
                if (selectedMonth(currentMonth) === create_at_month) {
                    let dateOfWeek = selectedWeek(customer_create_at.getDay());
                    if (dateOfWeek === dw.week) dw.count++;
                }
            });
        }
    });

    return (
        <div className="wrap-revenue-chart">

            <div className="revenue-chart-header">
                <h3>Khách hàng mới</h3>
                <select className="selectValueLineChart" name="" id=""
                    value={chartType}
                    onChange={e => setChartType(e.target.value)}
                >
                    <option value="month">Tháng</option>
                    <option value="week">Tuần</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={chartType === 'week' ? dataWeek : dataMonth}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }} 
                >
                    <CartesianGrid strokeDasharray="0 2" />
                    <XAxis dataKey={chartType === 'week' ? 'week' : 'month'} fontSize={'0.7rem'}/>
                    <YAxis fontSize={'0.7rem'} />
                    <Tooltip />
                    <Legend
                        iconType="square"
                        wrapperStyle={{
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                    <Line 
                        type="monotone"
                        dataKey="count"
                        stroke="#030303"
                        name="Khách hàng đăng ký mới"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}