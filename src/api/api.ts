// -------------------------------------------------
// Todas las llamadas a la API del backend en un solo archivo.
// El backend responde siempre con este formato:

// { success: true, message: "...", data: ...} → todo ok
// { success: false, message: "...", errors: ...} → 
// -------------------------------------------------

// URL donde corre el backend express
const API_URL = 'http:/localhost:7000'

// Los campos del usuario que usamos en la app
// (la API devuelve más, pero estos son los que mostramos)
export interface User {
    _id: string // MongoDB usa _id, no id
    nombre: string
    apellido: string
    email: string
    genero: string
    localidad: string
    role: string
}

// -------------------------------------------------
// POST /auth/login → devuelve { token, role }
// -------------------------------------------------

export async function login(email: string, password: string) {
    // 1. Hacemos la petición POST con email y password en ele body
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    // 2. Convertimos la respuesta a JSON
    const body = await response.json()

    // 3. Si el backend respondió con error, lanzamos su mensaje
    if (!body.success) {
        throw new Error(body.message) // Ej: "Passsword incorrecto"
    }

    // 4. Devolvemos solo la data: { token, role }
    return body.data
}
// -------------------------------------------------
// POST /users → crea un usuario nuevo
// Es una ruta protegida: solo un admin ya logieado puede crear usuarios 
// -------------------------------------------------
export async function createUser(nombre: string, apellido: string, email: string, password: string) {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token},`
        },
        body: JSON.stringify({
            nombre,
            apellido,
            email,
            password,
            role: 'USER',
            // El backend exige estos campos también.
            // Para mantener el formulario simple, mandamos valores por defecto.
            fechaNacimeinto: '2000-01-01',
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

    if(!body.success) {
        throw new Error(body.message) // ej: "El usuario ya existe", "Acceso denegado"
    }

    return body.data
}
