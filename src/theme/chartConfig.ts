import type { LegendProps } from "recharts";

export const chartConfig = {
  animationDuration: 100,
  pieOuterRadius: 70,
  pieInnerRadius: 40,
  barRadius: [8, 8, 0, 0] as const,
  legendProps: {
    align: "center",
    verticalAlign: "bottom",
    iconType: "circle",
    iconSize: 14,
    wrapperStyle: {
      color: "white",
      fontSize: 14,
    },
  } satisfies Partial<LegendProps>,
  pie: {
    width: "100%",
    height: 340,
    outerRadius: 60,
    innerRadius: 30,
    cx: "50%",
    cy: "40%",
    margin: {
      top: -20,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  bar: {
    height: 340,
    margin: { top: 10, right: 20, left: -10, bottom: 0 },
    radius: [12, 12, 0, 0] as const,
  },
  cartesianGrid: {
    strokeDasharray: "3 3",
    stroke: "#7564F0",
    strokeOpacity: "0.9",
  },
};
