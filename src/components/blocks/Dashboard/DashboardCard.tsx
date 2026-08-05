import CountUp from "react-countup";
import { motion } from "framer-motion";
import styles from "./DashboardCard.module.css";
import type { DashboardCardProps } from "./types";
import { animations } from "@/theme";

function DashboardCard({
    title,
    value,
    subtitle,
    icon,
    onClick,
}: DashboardCardProps) {

    const numeric = typeof value === "number";

    return (
        <motion.div
            whileHover={animations.cardHover}

            whileTap={animations.cardTap}

            transition={{
                duration: animations.duration,
            }}
        >
            <div className={styles.icon}>
                {icon}
            </div>

            <div className={styles.content}>

                <h2>

                    {numeric ? (

                        <CountUp

                            end={value}

                            duration={1.2}

                            separator=","

                        />

                    ) : (

                        value

                    )}

                </h2>

                <h3>{title}</h3>

                {subtitle && (

                    <span>{subtitle}</span>

                )}

            </div>

        </motion.div>
    );
}

export default DashboardCard;