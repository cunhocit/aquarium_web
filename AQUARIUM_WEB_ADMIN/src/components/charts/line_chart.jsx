import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3500 },
    { name: 'Mar', revenue: 4500 },
    { name: 'Apr', revenue: 5000 },
    { name: 'May', revenue: 5500 },
    { name: 'Jun', revenue: 6000 },
    { name: 'Jul', revenue: 3000 },
    { name: 'Aug', revenue: 7000 },
    { name: 'Sep', revenue: 7500 },
    { name: 'Oct', revenue: 8000 },
    { name: 'Nov', revenue: 8500 },
    { name: 'Dec', revenue: 9000 },
];

export default function LineChartRevenue() {
    return (
        <ResponsiveContainer width="100%" height='80%'>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="0 2" />
                <XAxis dataKey="name"  fontSize={'0.7rem'}/>
                <YAxis fontSize={'0.7rem'}/>
                <Tooltip />
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
                    dataKey="revenue" 
                    stroke="#000103c7"
                    name='Doanh thu'
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

// New costumer regis

const dataU = [
    { name: 'Mon', newCustomers: 10 },
    { name: 'Tue', newCustomers: 15 },
    { name: 'Wed', newCustomers: 20 },
    { name: 'Thu', newCustomers: 25 },
    { name: 'Fri', newCustomers: 30 },
    { name: 'Sat', newCustomers: 35 },
    { name: 'Sun', newCustomers: 40 },
];

export function LineChartNewCustomers() {
    return (
        <div style={{
            width: "45%",
            padding: "1rem",
            background: "white",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "5px"
        }}>
            <h3 style={{
                textAlign: "left",
                width: "85%"
            }}>Khách hàng mới trong tuần</h3>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={dataU}>
                    <CartesianGrid strokeDasharray="0 2" />
                    <XAxis dataKey="name" fontSize={'0.7rem'} />
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
                        dataKey="newCustomers"
                        stroke="#28a745"
                        name="Khách hàng đăng ký mới"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}