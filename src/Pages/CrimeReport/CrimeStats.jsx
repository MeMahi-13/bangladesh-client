import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

export default function CrimeStats({ barData, pieData, COLORS, activeIndex, setActiveIndex }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 py-10">
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-[#1B3C53] mb-4">Crimes Per Day</h2>
        <BarChart width={500} height={250} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="crimes" fill="#1B3C53" />
        </BarChart>
      </div>
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-bold text-[#1B3C53] mb-4">Crimes By Category</h2>
        <PieChart width={250} height={250}>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
            innerRadius={0} outerRadius={100} paddingAngle={1}
            onMouseEnter={(data, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{
                  transition: "all 0.3s",
                  transform: activeIndex === index ? "scale(1.01)" : "scale(1)",
                  cursor: "pointer",
                }}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip formatter={value => `${value} incidents`} />
        </PieChart>
      </div>
    </div>
  );
}
