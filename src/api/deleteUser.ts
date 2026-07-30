import { API_URL } from '@/config/globals'

export interface DeleteUserResponse {
    message: string
}

// ------------------------------------------------------------
// DELETE /users/:id → elimina un usuario
// Es una ruta protegida: solo ROOT o ADMIN pueden eliminar usuarios
// ------------------------------------------------------------
export async function deleteUser(id: string): Promise<DeleteUserResponse> {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error('No estás autenticado. Iniciá sesión nuevamente.')
    }

    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    const body = await response.json()

    if (!body.success) {
        throw new Error(body.message) // ej: "Usuario no encontrado", "Acceso denegado"
    }

    return body.data
}