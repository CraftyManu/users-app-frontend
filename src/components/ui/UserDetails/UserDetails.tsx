import type { User } from '@/api/types'
import GoogleMap from '@/components/ui/GoogleMap/GoogleMap'
import styles from './UserDetails.module.css'

interface UserDetailsProps {
    user: User
}

function UserDetails({ user }: UserDetailsProps) {
    const fields: [string, string][] = [
        ['Nombre', `${user.nombre} ${user.apellido}`],
        ['Email', user.email],
        ['Rol', user.role],
        ['Género', user.genero],
        ['Edad', String(user.edad)],
        ['Fecha de nacimiento', user.fechaNacimiento?.slice(0, 10) ?? ''],
        ['Teléfono', user.telefono],
        ['Dirección', user.direccion],
        ['Localidad', user.localidad],
        ['Provincia', user.provincia],
        ['País', user.pais],
        ['Código postal', user.codigoPostal],
        ['UserName', user.userName],
        ['Avatar URL', user.avatarURL ?? '-'],
    ]

    return (
        <>
            <dl className={styles.viewGrid}>
                {fields.map(([label, value]) => (
                    <div
                        key={label}
                        className={styles.viewRow}
                    >
                        <dt className={styles.viewLabel}>
                            {label}
                        </dt>

                        <dd className={styles.viewValue}>
                            {value || '-'}
                        </dd>
                    </div>
                ))}
            </dl>

            <GoogleMap user={user} />
        </>
    )
}

export default UserDetails