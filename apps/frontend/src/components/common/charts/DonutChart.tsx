import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type DonutItem = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  value: number;
  data: DonutItem[];
};

const DonutChart: React.FC<Props> = ({ value, data }) => {
  return (
    <div className="w-[180px] h-[180px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={50}
            outerRadius={85}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Centro */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[20px] font-semibold text-[var(--light-text)]">
          {value}%
        </span>
      </div>
    </div>
  );
};

export default DonutChart;