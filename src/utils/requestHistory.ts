import { API_URL } from "@/config/globals";
import { getAuthToken } from "@/api/authStorage";

export interface HistoryEntry {
    id: string;
    method: string;
    target: string;
    status: number;
    time: number;
    ok: boolean;
    at: string;
    details?: string;
    source?: "backend";
}

export interface SessionLogEntry {
    timestamp: string;
    level: string;
    message: string;
}

export interface SessionLogsResponse {
    success: boolean;
    sessionId?: string;
    count?: number;
    logs?: SessionLogEntry[];
}

type HistoryListener = (entries: HistoryEntry[]) => void;

const listeners = new Set<HistoryListener>();

function createEntry(method: string, target: string, status: number, time: number, ok: boolean, details?: string): HistoryEntry {
    return {
        id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        method,
        target,
        status,
        time,
        ok,
        at: new Date().toLocaleTimeString("es-AR"),
        details,
        source: "backend",
    };
}

function notifyListeners(entries: HistoryEntry[]) {
    listeners.forEach((listener) => listener([...entries]));
}

export function subscribeToRequestHistory(listener: HistoryListener) {
    listeners.add(listener);
    listener([]);

    return () => {
        listeners.delete(listener);
    };
}

export function getStoredSessionId(): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    return window.localStorage.getItem("sessionId");
}

function formatLogTimestamp(timestamp: string) {
    const parsed = new Date(timestamp);
    return Number.isNaN(parsed.getTime()) ? "--:--:--" : parsed.toLocaleTimeString("es-AR");
}

function parseBackendLog(log: SessionLogEntry): HistoryEntry | null {
    const message = log.message ?? "";
    const methodMatch = message.match(/\b(GET|POST|PUT|PATCH|DELETE)\b/i);
    const targetMatch = message.match(/\b(GET|POST|PUT|PATCH|DELETE)\s+([^\s]+)/i);
    const statusMatch = message.match(/\b(2\d\d|3\d\d|4\d\d|5\d\d)\b/);
    const timeMatch = message.match(/\((\d+)ms\)|\[(\d+)ms\]|\b(\d+)ms\b/i);

    if (!methodMatch || !targetMatch || !statusMatch) {
        return null;
    }

    const method = methodMatch[1].toUpperCase();
    const target = targetMatch[2] ?? "/";
    const statusValue = Number(statusMatch[1] ?? 0);
    const timeValue = Number(timeMatch?.[1] ?? timeMatch?.[2] ?? timeMatch?.[3] ?? 0);

    return createEntry(
        method,
        target,
        statusValue,
        timeValue,
        statusValue < 400,
        `Nivel ${log.level}`
    );
}

export async function loadSessionHistoryFromBackend(sessionId?: string): Promise<HistoryEntry[]> {
    const resolvedSessionId = sessionId ?? getStoredSessionId();
    const token = getAuthToken();

    if (!resolvedSessionId || !token) {
        return [];
    }

    try {
        const response = await fetch(`${API_URL}/sessions/${encodeURIComponent(resolvedSessionId)}/logs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const body = (await response.json()) as SessionLogsResponse & { data?: { logs?: SessionLogEntry[] } };
        const logs = Array.isArray(body?.logs)
            ? body.logs
            : Array.isArray(body?.data?.logs)
              ? body.data.logs
              : [];

        if (!body?.success || logs.length === 0) {
            return [];
        }

        return logs
            .map((log) => {
                const entry = parseBackendLog(log);
                if (!entry) {
                    return null;
                }

                entry.at = formatLogTimestamp(log.timestamp);
                return entry;
            })
            .filter((entry): entry is HistoryEntry => Boolean(entry))
            .reverse();
    } catch {
        return [];
    }
}

export function clearRequestHistory() {
    notifyListeners([]);
}
