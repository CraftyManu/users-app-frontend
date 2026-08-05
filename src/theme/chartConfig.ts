import type { LegendProps } from "recharts";

export const chartConfig = {
    animationDuration: 500,
    pieOuterRadius: 95,
    pieInnerRadius: 55,
    barRadius: [8,8,0,0] as const,
    legendProps: {
        align: "center",
        verticalAlign: "bottom",
        iconType: "circle",
    } satisfies Partial<LegendProps>,
};