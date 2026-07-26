import { API_URL } from "@/config/globals"
/* import { getAuthToken } from '@/api/authStorage' */

// -------------------------------------------------
// POST /users → crea un usuario nuevo
// Es una ruta protegida: solo un admin ya logieado puede crear usuarios 
// -------------------------------------------------
export async function createUser(nombre: string, apellido: string, email: string, password: string) {
    const token = localStorage.getItem('token')
    console.log(`createUser function / token=${token}`)
    /*     const token = getAuthToken() */

    if (!token) {
        throw new Error('No estás autenticado. Iniciá sesión nuevamente.')
    }

    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            nombre,
            apellido,
            email,
            password,
            role: 'USER',
            // El backend exige estos campos también.
            // Para mantener el formulario simple, mandamos valores por defecto.
            fechaNacimiento: '2000-01-01',
            genero: 'No especificado',
            telefono: '000000',
            direccion: 'Sin dirección',
            localidad: 'Sin localidad',
            provincia: 'Sin provincia',
            pais: 'Argentina',
            codigoPostal: '0000'
        }),
    })

    const body = await response.json()

    if (!body.success) {
        throw new Error(body.message) // ej: "El usuario ya existe", "Acceso denegado"
    }

    /*     let body
        try {
            body = await response.json()
            console.log(`body: ${body}`)
        } catch {
            body = { success: false, message: 'Respuesta inválida del servidor' }
        }
    
        if (!response.ok || !body.success) {
            console.log("🚀 ~ createUser - if (!response.ok || !body.success) ~ body.message:", body.message)
            throw new Error(body.message || 'No se pudo crear el usuario')
        } */

    return body.data
}
