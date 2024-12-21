/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const generateColors = (num) => {
  const colors = new Set();
  while (colors.size < num) {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`; // Tạo màu HEX
    colors.add(color);
  }
  return Array.from(colors); 
};

const PieChartTopSelling = ({categories, revenues}) => {
  const dataPie = []
  
  categories.map(e => {
    dataPie.push({name: e.category, value: 0});
  })

  revenues.map(e => {
    dataPie.map(d => {
      if (e.category === d.name) {
        d.value += e.quantity
      }
    })
  });

  const COLORS = generateColors(dataPie.length)

  return (
    <div className="wrap-top-categories">
      <h3>Danh mục bán chạy</h3>
      <div className="wrap-pie-pad-angle">
        <ResponsiveContainer width={'100%'} height={'100%'}>
            <PieChart>
            <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={6}
                dataKey="value"
            >
                {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} lượt bán`, `${name}`]} />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartTopSelling;
