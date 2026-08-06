import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { chartColors } from "@/theme/chartColors";
import { chartConfig } from "@/theme";

interface AgeChartProps {
  data: {
    label: string;
    count: number;
  }[];
}

function AgeChart({ data }: AgeChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        margin={{
          top: 0,
          left: -25,
          right: 15,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="ageGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColors.admin} />

            <stop offset="100%" stopColor={chartColors.user} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray={chartConfig.cartesianGrid.strokeDasharray} stroke={chartConfig.cartesianGrid.stroke} strokeOpacity={chartConfig.cartesianGrid.strokeOpacity} />

        <XAxis
          dataKey="label"
          tick={{
            fill: "#9b9b9b",
            fontSize: 16,
          }}
        />

        <YAxis
          allowDecimals={false}
          tick={{
            fill: "#9b9b9b",
            fontSize: 16,
          }}
        />

        <Tooltip />

        <Bar
          dataKey="count"
          fill="url(#ageGradient)"
          radius={[6, 6, 0, 0]}
          /* barSize={25} */
        />
        {/* 
                <Bar
                    dataKey="count"
                    fill="url(#ageGradient)"
                    radius={chartConfig.barRadius}
                /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AgeChart;
