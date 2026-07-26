import { API_URL } from "@/config/globals";
import type { User } from '@/api/types'
/* import { getAuthToken } from '@/api/authStorage' */

// -------------------------------------------------
// GET /users →  devuelve la lista de usuarios
// Es una ruta protegida: hay que mandar el token del login
// -------------------------------------------------

export async function getUsers(): Promise<User[]> {
    console.log('function getUsers in getUsers.ts(frontend)')
    // El token guardado en el login prueba quienes somos
    const token = localStorage.getItem('token')
    console.log(`token: ${token}`)

    const response = await fetch(`${API_URL}/users`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    console.log(`response: ${response}`)
    console.log(response)

    const body = await response.json()

    console.log(`body`)
    console.log(body)

    if (!body.success) {
        throw new Error(body.message) // ej: "Acceso denegado", "Token inválido"
    }

    console.log(`getUsers.ts -> body.data:`)
    console.log(body.data)

    return body.data
}