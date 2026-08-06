import { useMemo } from "react";

import type { DashboardUser, DashboardStats } from "./types";

import { buildDashboardStats } from "./dashboardUtils";

export function useDashboardStats(users: DashboardUser[]): DashboardStats {
  return useMemo(() => buildDashboardStats(users), [users]);
}
