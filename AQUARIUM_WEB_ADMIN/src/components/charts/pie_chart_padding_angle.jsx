import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Cá cảnh', value: 500 },
  { name: 'Cây thủy sinh', value: 200 },
  { name: 'Thức ăn', value: 400 },
  { name: 'Phụ kiện', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartWithPaddingAngle = () => {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
        <PieChart>
        <Pie
            data={data}
            cx="50%"     
            cy="50%"      
            innerRadius={80} 
            outerRadius={120} 
            fill="#8884d8"
            paddingAngle={6}  
            dataKey="value"
        >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            
        </Pie>
        <Tooltip />
        <Legend />  
        </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartWithPaddingAngle;
