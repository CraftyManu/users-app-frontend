import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import { updateUser } from "@/api/updateUser";
import type { User } from "@/api/types";
import styles from "./UserEditForm.module.css";
import { Trash2 } from "lucide-react";
import { provinciasArgentinas } from './provincias'

const ROLES = ["ROOT", "ADMIN", "USER", "GUEST"];
const GENEROS = ["Femenino", "Masculino", "Otro"];
const PROVINCIAS = provinciasArgentinas;

interface UserEditFormProps {
  user: User;
  onCancel: () => void;
  onSaved: (user: User) => void;
  onDelete: (userId: string) => Promise<void>;
  canDelete: boolean;
}

// ------------------------------------------------------------
// Vista "Editar": formulario que guarda cambios con updateUser
// El email no se incluye: el backend no permite modificarlo
// ------------------------------------------------------------

function UserEditForm({ user, onCancel, onSaved, onDelete, canDelete }: UserEditFormProps) {
  const [nombre, setNombre] = useState(user.nombre);
  const [apellido, setApellido] = useState(user.apellido);
  const [genero, setGenero] = useState(user.genero);
  const [fechaNacimiento, setFechaNacimiento] = useState(user.fechaNacimiento?.slice(0, 10) ?? "");
  const [telefono, setTelefono] = useState(user.telefono);
  const [direccion, setDireccion] = useState(user.direccion);
  const [localidad, setLocalidad] = useState(user.localidad);
  const [provincia, setProvincia] = useState(user.provincia);
  const [pais, setPais] = useState(user.pais);
  const [codigoPostal, setCodigoPostal] = useState(user.codigoPostal);
  const [role, setRole] = useState(user.role);
  const [userName, setUserName] = useState(user.userName);
  const [avatarURL, setAvatarURL] = useState(user.avatarURL ?? "");
  /* const [password, setPassword] = useState(user.password) */

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const payload: any = {
        nombre,
        apellido,
        genero,
        fechaNacimiento,
        telefono,
        direccion,
        localidad,
        provincia,
        pais,
        codigoPostal,
        userName,
        avatarURL,
      };

      if (role !== user.role) {
        payload.role = role;
      }

      const updated = await updateUser(user._id, payload, {
        nombre: user.nombre,
        apellido: user.apellido,
        genero: user.genero,
        fechaNacimiento: user.fechaNacimiento,
        telefono: user.telefono,
        direccion: user.direccion,
        localidad: user.localidad,
        provincia: user.provincia,
        pais: user.pais,
        codigoPostal: user.codigoPostal,
        role: user.role,
        userName: user.userName,
        avatarURL: user.avatarURL,
      });

      onSaved(updated);
      onCancel();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Nombre</label>

            <input className={styles.input} value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div>
            <label className={styles.label}>Apellido</label>

            <input className={styles.input} value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Género</label>

            <select className={styles.select} value={genero} onChange={(e) => setGenero(e.target.value)}>
              {GENEROS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Fecha de nacimiento</label>

            <input className={styles.input} type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Teléfono</label>

            <input className={styles.input} value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>

          <div>
            <label className={styles.label}>Dirección</label>

            <input className={styles.input} value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Localidad</label>

            <input className={styles.input} value={localidad} onChange={(e) => setLocalidad(e.target.value)} />
          </div>

          <div>
            <label className={styles.label}>Provincia</label>
            <select className={styles.select} value={provincia} onChange={(e) => setProvincia(e.target.value)}>
              {PROVINCIAS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>

            {/*             <input className={styles.input} value={provincia} onChange={(e) => setProvincia(e.target.value)} />
 */}          </div>
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>País</label>

            <input className={styles.input} value={pais} onChange={(e) => setPais(e.target.value)} />
          </div>

          <div>
            <label className={styles.label}>Código Postal</label>

            <input className={styles.input} value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
          </div>
        </div>
        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Rol</label>

            <select className={styles.select} value={role} onChange={(e) => setRole(e.target.value)}>
              {ROLES.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>Username</label>

            <input className={styles.input} value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
        </div>

        <label className={styles.label}>Avatar URL</label>

        <input className={styles.input} value={avatarURL} onChange={(e) => setAvatarURL(e.target.value)} />

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.modalActions}>
          {canDelete && (
            <Button variant="delete" type="button" onClick={() => onDelete(user._id)}>
              <Trash2 size={18} />
            </Button>
          )}

          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancelar
          </Button>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default UserEditForm;
