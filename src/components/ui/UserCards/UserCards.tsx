import type { User } from '@/api/types'
import Avatar from '@/components/ui/Avatar/Avatar'
import GenderIcon from '@/components/ui/GenderIcon/GenderIcon'
import { Eye, Pencil, Trash2, Mail, Shield, Phone, Link } from 'lucide-react'
import styles from './UserCards.module.css'
import MapOnHover from '@/components/ui/MapOnHover/MapOnHover'

interface UserCardsProps {
    users: User[]
    onView: (user: User) => void
    onEdit: (user: User) => void
    onDelete: (userId: string) => void
    canDelete: (user: User) => boolean
    showDeleteButton: boolean
}

function UserCards({
    users,
    onView,
    onEdit,
    onDelete,
    canDelete,
    showDeleteButton,
}: UserCardsProps) {
    if (users.length === 0) {
        return (
            <div className={styles.empty}>
                No users found.
            </div>
        )
    }

    return (
        <div className={`${styles.mobileCards}`}>
            {users.map((user) => (
                <article
                    key={user._id}
                    className={styles.card}
                >
                    <div className={styles.header}>
                        <Avatar user={user} />

                        <div className={styles.userInfo}>
                            <h3>
                                {user.nombre} {user.apellido}
                            </h3>

                            <span>{user.email}</span>
                        </div>

                        <div>
                            <span className={styles.gender}>
                                <GenderIcon
                                    gender={user.genero as
                                        | 'Masculino'
                                        | 'Femenino'}
                                />
                            </span>
                        </div>

                    </div>

                    <div className={styles.userDetails}>

                        <div className={styles.row}>
                            <MapOnHover user={user} />
                        </div>

                        <div className={styles.row}>
                            <Phone size={16} />
                            <span>{user.telefono}</span>
                        </div>

                        <div className={styles.row}>
                            <Mail size={16} />
                            <span>{user.email}</span>
                        </div>

                        <div className={styles.row}>
                            <label>Fecha Nacimiento:</label>
                            <span>{user.fechaNacimiento?.split('T')[0]}</span>
                            {/*<span>{new Date(user.fechaNacimiento).toLocaleDateString('es-AR')}</span>
 */}                        </div>

                        <div className={styles.row}>
                            <label>Edad:</label>
                            <span>{user.edad}</span>
                        </div>

                        <div className={`${styles.row} ${styles.avatarURL}`}>
                            <Link size={16} />
                            <span className={`${styles.row} ${styles.avatarURL}`}>{user.avatarURL}</span>
                        </div>

                        <div className={styles.row}>
                            <Shield size={16} />
                            <span className={`${styles.badge} ${styles[`badge__${user.role.toLowerCase()}`] ?? ''}`}>
                                {user.role}
                            </span>
                            {/* <div>
                                <span className={styles.gender}>
                                    <GenderIcon
                                        gender={user.genero as
                                            | 'Masculino'
                                            | 'Femenino'}
                                    />
                                </span>
                            </div> */}
                        </div>
                    </div>


                    <footer className={styles.actions}>
                        <button className={`${styles.iconButton} ${styles.viewButton}`} onClick={() => onView(user)}
                            title="Ver usuario"
                        >
                            <Eye size={18} />
                        </button>

                        <button className={`${styles.iconButton} ${styles.editButton}`} onClick={() => onEdit(user)}
                            title="Editar usuario"
                        >
                            <Pencil size={18} />
                        </button>

                        {showDeleteButton && (
                            <button
                                className={`${styles.iconButton} ${styles.deleteButton}`}
                                onClick={() => onDelete(user._id)}
                                title={canDelete(user) ? 'Eliminar usuario' : 'No puedes eliminar este usuario'}
                                disabled={!canDelete(user)}
                            /* title="Eliminar usuario" */
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
                    </footer>
                </article>
            ))}
        </div>
    )
}

export default UserCards