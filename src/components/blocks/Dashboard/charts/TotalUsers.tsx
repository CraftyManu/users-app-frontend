import { Users, Cake, UserRound, Baby } from "lucide-react";

import type { DashboardStats } from "../types";

import styles from "./TotalUsers.module.css";

interface TotalUsersProps {
  stats: Pick<DashboardStats, "totalUsers" | "averageAge" | "oldest" | "youngest">;
}

function TotalUsers({ stats }: TotalUsersProps) {
  const items = [
    {
      icon: Users,
      label: "Total de usuarios",
      value: stats.totalUsers,
    },

    {
      icon: Cake,
      label: "Edad media",
      value: stats.averageAge,
    },

    {
      icon: UserRound,
      label: "Usuario mayor",
      value: stats.oldest,
    },

    {
      icon: Baby,
      label: "Usuario menor",
      value: stats.youngest,
    },
  ];

  return (
    <div className={styles.container}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className={styles.item}>
            <div className={styles.left}>
              <Icon size={20} className={styles.icon} />
              <span>{item.label}</span>
            </div>
            <span className={styles.value}>{item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default TotalUsers;
