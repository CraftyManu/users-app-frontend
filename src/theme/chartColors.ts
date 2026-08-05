import type { LegendProps } from "recharts";

export const chartColors = {

    // Generic colors

    primary: "#646cff",
    secondary: "#8b7cf6",
    accent: "#46beff",
    success: "#4ade80",

    pink: "#ff70c2",
    neutral: "#94a3b8",
    warning: "#f59e0b",
    danger: "#ef4444",

    // Role colors (matching your badges)

    root: "#ff5ade",

    admin: "#7b5aff",

    user: "#46beff",

    guest: "#5168c7",

};

export const roleColors = {
    ROOT: chartColors.root,
    ADMIN: chartColors.admin,
    USER: chartColors.user,
    GUEST: chartColors.guest,
};

export const genderColors = {
    Male: chartColors.primary,
    Female: chartColors.pink,
    Other: chartColors.neutral,
};

export const chartConfig = {

    animationDuration: 500,

    pieOuterRadius: 95,

    pieInnerRadius: 55,

    barRadius: [8, 8, 0, 0] as const,

    legendProps: {
        align: "center",
        verticalAlign: "bottom",
        iconType: "circle",
    } satisfies Partial<LegendProps>,
};