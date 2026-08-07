import { methodClass } from "../../../utils/json";
import { clearRequestHistory, type HistoryEntry } from "@/utils/requestHistory";
import styles from './HistorialCard.module.css'

interface HistoryCardProps {
    history: HistoryEntry[];
    setHistory: React.Dispatch<React.SetStateAction<HistoryEntry[]>>;
}

function HistoryCard({ history, setHistory }: HistoryCardProps) {
    return (
        <section
            id="history"
            className={styles.history}
        >
            <div className={styles.historyHeading}            >
                <div>
                    <p className={styles.p} >SESSION LOG</p>
                    <h2 className={styles.h2}>Historial de requests</h2>
                </div>
                <button
                    className="clear"
                    onClick={() => {
                        clearRequestHistory();
                        setHistory([]);
                    }}
                >
                    Limpiar historial
                </button>
            </div>
            {history.length ? (
                <div className={styles.historyList}>
                    {history.map((h) => (
                        <div
                            className={styles.historyRow}
                            key={h.id}
                        >
                            {h.method === 'LOG' ? (
                                // Render generic log message spanning the row
                                <>
                                    <div style={{ gridColumn: "1 / -1", color: "#9ba7c7", whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
                                        <strong>LOG</strong> — {h.details}
                                    </div>
                                    <time style={{ gridColumn: "1 / -1", marginTop: 6, color: "#7d8aa6" }}>{h.at}</time>
                                </>
                            ) : (
                                // Existing request-style row
                                <>
                                    <span className={methodClass(h.method)} style={{ fontWeight: 700, textTransform: "uppercase" }}>
                                        {h.method}
                                    </span>
                                    <code className={styles.code}>{h.target}</code>
                                    <span className={h.ok ? "ok" : "bad"} style={{ color: h.ok ? "#7fffd4" : "#ff8f8f", fontWeight: 600 }}>
                                        {h.status ? `HTTP ${h.status}` : 'HTTP -'}
                                    </span>
                                    <span>{h.time} ms</span>
                                    <time>{h.at}</time>
                                    {h.details && <small style={{ gridColumn: "1 / -1", color: "#9ba7c7" }}>{h.details}</small>}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-history" style={{ margin: 0, color: "#9ba7c7" }}>
                    Todavía no realizaste requests en esta sesión.
                </p>
            )}
        </section>
    );
}

export default HistoryCard;