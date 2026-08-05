import PieChartCard from "./PieChartCard";
import { genderColors } from "@/theme/chartColors";
import { chartConfig } from "@/theme/chartConfig";
import type { ChartData, GenderId } from "../types";

interface GenderChartProps {
    data: ChartData<GenderId>[];
}


function GenderChart({ data }: GenderChartProps) {
    return (
        <PieChartCard
            data={data}
            colors={genderColors}
            innerRadius={chartConfig.pieInnerRadius}
            outerRadius={chartConfig.pieOuterRadius}
        />
    );
}

export default GenderChart;