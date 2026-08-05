import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { chartColors } from "@/theme/chartColors";
import { chartConfig } from "@/theme/chartConfig";
import type { ChartData } from "../types";

interface PieChartCardProps<T extends string> {
    data: ChartData<T>[];
    colors: Record<string, string>;
    innerRadius?: number;
    outerRadius?: number;
    paddingAngle?: number;
}

function PieChartCard<T extends string>({
    data,
    colors,
    paddingAngle = 2,
    /* innerRadius = 40 */
}: PieChartCardProps<T>) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart
                /* margin={{ top: -35, bottom: 25, }} */
            >
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="label"
                    /* innerRadius={innerRadius}  */
                    innerRadius={chartConfig.pie.innerRadius}
                    outerRadius={chartConfig.pie.outerRadius}
                    paddingAngle={paddingAngle}
                    cy={chartConfig.pie.cy}
                >
                    {data.map((entry) => (
                        <Cell
                            key={entry.id}

                            fill={
                                colors[entry.id] ??
                                chartColors.neutral
                            }
                        />
                    ))}

                </Pie>

                <Tooltip />

                <Legend {...chartConfig.legendProps}
                    
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default PieChartCard;