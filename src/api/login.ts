import { API_URL } from "@/config/globals";

// -------------------------------------------------
// POST /auth/login → devuelve { token, role }
// -------------------------------------------------

export async function login(email: string, password: string) {
  // 1. Hacemos la petición POST con email y password en ele body
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  // 2. Convertimos la respuesta a JSON
  const body = await response.json();

  // 3. Si el backend respondió con error, lanzamos su mensaje
  if (!body.success) {
    throw new Error(body.message); // Ej: "Passsword incorrecto"
  }

  const data = body.data;
  const sessionId = data?.sessionId ?? body.sessionId ?? body.data?.sessionId;

  if (sessionId) {
    localStorage.setItem("sessionId", sessionId);
  }

  // 4. Devolvemos solo la data: { token, role }
  return data;
}
