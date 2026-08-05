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
    innerRadius = 0,
    outerRadius = 90,
    paddingAngle = 2,
}: PieChartCardProps<T>)  {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    paddingAngle={paddingAngle}
/*                     onClick={(data: any) => {
                        onSliceClick?.(data?.name);
                    }} */

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

                <Legend {...chartConfig.legendProps} />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default PieChartCard;