import { Link } from "@tanstack/react-router";
import styles from "./CreateForm.module.css";
import Button from "@/components/ui/Button/Button";
import Title from "@/components/ui/Title/Title";
import Subtitle from "@/components/ui/Subtitle/Subtitle";
import Footer from "@/components/ui/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createUser } from "@/api/createUser";
import { getAuthToken } from "@/api/authStorage";
import { Eye, EyeOff } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";

function CreateForm() {
  const navigate = useNavigate();
  const { loadUsers } = useUsers();

  // Inputs controlados: React es la fuente de verdad del valor
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Esta página es solo para admins logueados: sin token, no entra
    if (!getAuthToken()) {
      navigate({ to: "/login" });
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Evita que el navegador recargue la página
    setError(null);
    setLoading(true);
    try {
      await createUser(nombre, apellido, email, password);
      await loadUsers();
      // Usuario creado → volvemos a la lista para verlo
      navigate({ to: "/" });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Title>Crear Usuario</Title>
      <Subtitle>Completá los datos del nuevo usuarioo</Subtitle>

      <label className={styles.label} htmlFor="name">
        Nombre
      </label>
      <input className={styles.input} id="name" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

      <label className={styles.label} htmlFor="lastname">
        Apellido
      </label>
      <input className={styles.input} id="lastname" type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />

      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input className={styles.input} id="email" type="email" placeholder="usuario@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <div className={styles.passwordField}>
        <label className={styles.label} htmlFor="password">
          Contraseña
        </label>
        <input className={styles.input} id="password" type={showPassword ? "text" : "password"} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Mensaje de error que viene del backend */}
      {error && <p className={styles.error}>{error}</p>}

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Creando..." : "Crear Usuario"}
      </Button>

      <Footer>
        <Link to="/">Volver a la lista</Link>
      </Footer>
    </form>
  );
}

export default CreateForm;