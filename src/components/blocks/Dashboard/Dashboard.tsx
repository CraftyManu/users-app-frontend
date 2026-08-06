/* import { useMemo } from "react"; */
/* import { Users, Shield, Venus, Cake, } from "lucide-react";
import DashboardCard from "./DashboardCard"; */
import Button from "@/components/ui/Button/Button";
import styles from "./Dashboard.module.css";
import { useDashboardStats } from "./useDashboardStats";
import type { DashboardProps } from "./types";
import ChartCard from "./ChartCard";
import AgeChart from "./charts/AgeChart";
import RoleChart from "./charts/RoleChart";
import GenderChart from "./charts/GenderChart";
import TotalUsers from "./charts/TotalUsers";
import { X } from "lucide-react";

function Dashboard({ users, onClose }: DashboardProps) {
  const stats = useDashboardStats(users);

  return (
    <section className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <Button variant="smallIcon" onClick={onClose}>
          {/* Cerrar dashboard  */}
          <X />
        </Button>
      </div>

      <div className={styles.charts}>
        <ChartCard title="Datos generales" subtitle="Estadísticas de usuarios">
          <TotalUsers stats={stats} />
        </ChartCard>

        <ChartCard title="Usuarios por Rol" subtitle="Distribución por roles">
          <RoleChart data={stats.roleChart} />
        </ChartCard>

        <ChartCard title="Usuarios por Género" subtitle="Distribución por géneros">
          <GenderChart data={stats.genderChart} />
        </ChartCard>

        <ChartCard title="Usuarios por Edades" subtitle="Distribución por Edad">
          <AgeChart data={stats.ageGroups} />
        </ChartCard>
      </div>
    </section>
  );
}

export default Dashboard;
