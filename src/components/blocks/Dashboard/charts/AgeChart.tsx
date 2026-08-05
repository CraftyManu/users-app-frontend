import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { chartColors } from "@/theme/chartColors";

interface AgeChartProps {
    data: {
        label: string;
        count: number;
    }[];
}

function AgeChart({ data }: AgeChartProps) {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <BarChart
                data={data}
            >

                <defs>
                    <linearGradient
                        id="ageGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor={chartColors.admin}
                        />

                        <stop
                            offset="100%"
                            stopColor={chartColors.user}
                        />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#7564F0"
                />

                <XAxis
                    dataKey="label"
                />

                <YAxis
                    allowDecimals={false}
                />

                <Tooltip />

                <Bar
                    dataKey="count"
                    fill="url(#ageGradient)"
                    radius={[8, 8, 0, 0]}
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