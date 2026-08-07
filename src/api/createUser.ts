import { API_URL } from "@/config/globals";

// -------------------------------------------------
// POST /users → crea un usuario nuevo
// Es una ruta protegida: solo un admin ya logieado puede crear usuarios
// -------------------------------------------------
export async function createUser(nombre: string, apellido: string, email: string, password: string) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No estás autenticado. Iniciá sesión nuevamente.");
  }

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        apellido,
        email,
        password,
        role: "USER",
        // El backend exige estos campos también.
        // Para mantener el formulario simple, mandamos valores por defecto.
        fechaNacimiento: "2000-01-01",
        genero: "Otro",
        telefono: "000000",
        direccion: "Sin dirección",
        localidad: "Sin localidad",
        provincia: "Sin provincia",
        pais: "Argentina",
        codigoPostal: "0000",
      }),
    });

    const body = await response.json();

    if (!body.success) {
      throw new Error(body.message); // ej: "El usuario ya existe", "Acceso denegado"
    }

    return body.data;
  } catch (error) {
    throw error;
  }
}
