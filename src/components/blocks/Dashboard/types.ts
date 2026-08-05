/* ALL interfaces & types */
import type { User } from "@/api/types";

export type DashboardUser = User;

export type RoleId =
    | "ROOT"
    | "ADMIN"
    | "USER"
    | "GUEST";

export type GenderId =
    | "Male"
    | "Female"
    | "Other";

export interface AgeGroup {
    label: string;
    count: number;
}

export interface ChartData<T extends string> {
    id: T;
    label: string;
    value: number;
}

export interface RoleStats {
    ROOT: number;
    ADMIN: number;
    USER: number;
    GUEST: number;
}

export interface GenderStats {
    Masculino: number;
    Femenino: number;
    Otro: number;
}

export interface DashboardStats {
    totalUsers: number;
    averageAge: number;
    youngest: number;
    oldest: number;
    roles: RoleStats;
    gender: GenderStats;
    ageGroups: AgeGroup[];
    roleChart: ChartData<RoleId>[];
    genderChart: ChartData<GenderId>[];
}

export interface DashboardProps {
    users: DashboardUser[];
}

export interface DashboardCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: React.ReactNode;
    onClick?: () => void;
}