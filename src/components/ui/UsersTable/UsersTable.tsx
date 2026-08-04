import type { User } from '@/api/types'
import Avatar from '@/components/ui/Avatar/Avatar'
import GenderIcon from '@/components/ui/GenderIcon/GenderIcon'
import styles from './UsersTable.module.css'
import { Eye, Pencil, Trash2 } from 'lucide-react'

export type SortKey =
    | 'nombre'
    | 'email'
    | 'genero'
    | 'localidad'
    | 'role'

export type SortDirection = 'asc' | 'desc'

interface UsersTableProps {
    users: User[]
    sortConfig: {
        key: SortKey
        direction: SortDirection
    }
    onSort: (key: SortKey) => void
    onView: (user: User) => void
    onEdit: (user: User) => void
    onDelete: (userId: string) => void
}

function UsersTable({
    users,
    sortConfig,
    onSort,
    onView,
    onEdit,
    onDelete,
}: UsersTableProps) {
    function renderSortButton(key: SortKey) {
        return (
            <button
                type="button"
                className={styles.sortButton}
                onClick={() => onSort(key)}
            >
                {sortConfig.key === key
                    ? sortConfig.direction === 'asc'
                        ? '▲'
                        : '▼'
                    : '↕'}
            </button>
        )
    }

    return (
        <div className={`${styles.tableWrapper} ${styles.desktopTable}`}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>
                            Usuario
                            {renderSortButton('nombre')}
                        </th>

                        <th
                            className={`${styles.th} ${styles.columnEmail}`}
                        >
                            Email
                            {renderSortButton('email')}
                        </th>

                        <th
                            className={`${styles.th} ${styles.columnGenero}`}
                        >
                            Género
                            {renderSortButton('genero')}
                        </th>

                        <th
                            className={`${styles.th} ${styles.columnLocalidad}`}
                        >
                            Localidad
                            {renderSortButton('localidad')}
                        </th>

                        <th className={styles.th}>
                            Rol
                            {renderSortButton('role')}
                        </th>

                        <th className={styles.th}>
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user._id}
                            className={styles.tr}
                        >
                            <td className={styles.td}>
                                <div className={styles.userCell}>
                                    <Avatar user={user} />

                                    <span className={styles.userInfo}>
                                        <span className={styles.nombre}>{user.nombre}</span> &ensp; <span className={styles.apellido}>{user.apellido}</span>
                                    </span>
                                </div>
                            </td>

                            <td
                                className={`${styles.td} ${styles.columnEmail}`}
                            >
                                {user.email}
                            </td>

                            <td
                                className={`${styles.td} ${styles.genderCell} ${styles.columnGenero}`}
                            >
                                <GenderIcon
                                    gender={
                                        user.genero as
                                        | 'Masculino'
                                        | 'Femenino'
                                    }
                                />
                            </td>

                            <td
                                className={`${styles.td} ${styles.columnLocalidad}`}
                            >
                                {user.localidad}
                            </td>

                            <td className={styles.td}>
                                <span
                                    className={`${styles.badge} ${styles[
                                        `badge__${user.role.toLowerCase()}`
                                        ] ?? ''
                                        }`}
                                >
                                    {user.role}
                                </span>
                            </td>

                            <td className={styles.td}>
                                <div className={styles.actions}>
                                    <button
                                        className={`${styles.iconBtn} ${styles.viewButton}`}
                                        onClick={() => onView(user)}
                                        title="Ver usuario"
                                    >
                                        <Eye size={18} />
                                    </button>

                                    <button
                                        className={`${styles.iconBtn} ${styles.editButton}`}
                                        onClick={() => onEdit(user)}
                                        title="Editar usuario"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        className={`${styles.iconBtn} ${styles.deleteButton}`}
                                        onClick={() => onDelete(user._id)}
                                        title="Eliminar usuario"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable