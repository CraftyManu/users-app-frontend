/* import { useMemo } from "react"; */
/* import { Users, Shield, Venus, Cake, } from "lucide-react";
import DashboardCard from "./DashboardCard"; */
import styles from "./Dashboard.module.css";
import { useDashboardStats } from "./useDashboardStats"; 
import type { DashboardProps } from "./types";
import ChartCard from "./ChartCard";
import AgeChart from "./charts/AgeChart";
import RoleChart from "./charts/RoleChart";
import GenderChart from "./charts/GenderChart";

function Dashboard({ users }: DashboardProps) {

    const stats = useDashboardStats(users);

    return (
        <section className={styles.dashboard}>

            <div className={styles.charts}>

                <ChartCard
                    title="Users por Rol"
                    subtitle="Distribución por roles"
                >

                    <RoleChart
                        data={stats.roleChart}
                    />

                </ChartCard>

                <ChartCard
                    title="Users por Género"
                    subtitle="Distribución por géneros"
                >

                    <GenderChart
                        data={stats.genderChart}
                    />

                </ChartCard>

                <ChartCard
                    title="Distribución por Edad"
                    subtitle="Usuarios agrupados por edad"
                >

                    <AgeChart
                        data={stats.ageGroups}
                    />

                </ChartCard>

            </div>

        </section>
    );
}

export default Dashboard;