import { chartConfig } from "@/theme/chartConfig";
import { roleColors } from "@/theme/chartColors";
import type { ChartData, RoleId } from "../types";

import PieChartCard from "./PieChartCard";

interface RoleChartProps {
  data: ChartData<RoleId>[];
}

function RoleChart({ data }: RoleChartProps) {
  return <PieChartCard data={data} colors={roleColors} innerRadius={chartConfig.pieInnerRadius} outerRadius={chartConfig.pieOuterRadius} paddingAngle={3} />;
}

export default RoleChart;
