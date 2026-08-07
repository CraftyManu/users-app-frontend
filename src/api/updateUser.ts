import { API_URL } from "@/config/globals";
import type { User } from "@/api/types";
/* import { getAuthToken } from '@/api/authStorage' */

// El email no se puede modificar: el backend rechaza el request si viene en el body
export type UpdateUserPayload = Partial<Omit<User, "_id" | "email">>;

// ------------------------------------------------------------
// PUT /users/:id → actualiza un usuario existente
// Es una ruta protegida: solo un admin ya logueado puede editar usuarios
// ------------------------------------------------------------
export async function updateUser(id: string, data: UpdateUserPayload, originalUser?: Partial<User>): Promise<User> {
  /*  const token = getAuthToken() */
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!body.success) {
      throw new Error(body.message); // ej: "El email no puede modificarse", "Usuario no encontrado"
    }

    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof UpdateUserPayload;
      const originalValue = originalUser?.[typedKey as keyof User];
      const newValue = data[typedKey];

      if (newValue === undefined || originalValue === undefined) {
        return;
      }

      if (typeof originalValue === "string" && typeof newValue === "string") {
        if (originalValue.trim() !== newValue.trim()) {
          void 0;
        }
      } else if (originalValue !== newValue) {
        void 0;
      }
    });

    // El backend devuelve el usuario actualizado con "id" en vez de "_id"
    const { id: userId, ...rest } = body.data;
    return { _id: userId, ...rest };
  } catch (error) {
    throw error;
  }
}
