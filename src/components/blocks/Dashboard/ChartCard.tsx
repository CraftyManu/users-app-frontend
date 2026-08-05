import styles from "./ChartCard.module.css";

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

function ChartCard({
    title,
    subtitle,
    children,
}: ChartCardProps) {

    return (
        <div className={styles.card}>

            <header className={styles.header}>
                <h2>{title}</h2>

                {subtitle && (
                    <span>{subtitle}</span>
                )}
            </header>

            <div className={styles.content}>
                {children}
            </div>

        </div>
    );
}

export default ChartCard;