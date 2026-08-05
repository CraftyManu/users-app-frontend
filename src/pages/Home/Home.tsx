import { useNavigate } from '@tanstack/react-router'
import Button from '@/components/ui/Button/Button'
import Modal from '@/components/blocks/Modal/Modal'
import styles from './Home.module.css'
import type { User } from '@/api/types'
import UsersTable from '@/components/ui/UsersTable/UsersTable'
import backgroundVideo from "@/assets/videos/dna-strand-calidad-baja.mp4";
import UserCards from '@/components/ui/UserCards/UserCards'
import UserDetails from '@/components/ui/UserDetails/UserDetails'
import UserEditForm from '@/components/ui/UserEditForm/UserEditForm'
import { useUsers } from '@/hooks/useUsers'
import { useUserModal } from '@/hooks/useUserModal'
import { useEffect, useState } from 'react'
import Dashboard from '@/components/blocks/Dashboard/Dashboard'
import { SquareArrowOutUpRight } from 'lucide-react'

function Home() {
    const navigate = useNavigate()
    const [dashboardOpen, setDashboardOpen] = useState(true)

    const {
        users,
        loading,
        error,

        sortedUsers,
        sortConfig,

        handleSort,
        handleUserUpdated,

        deleteUserById,
    } = useUsers()

    // Usuario seleccionado para ver o editar en el modal



    // Get user role from localStorage
    const userRole = localStorage.getItem('role') || 'GUEST'
    //Get user email from localStorage
    const userEmail = localStorage.getItem('email')


    useEffect(() => {
        // Protección mínima de ruta: sin token no tiene sentido estar acá
        if (!localStorage.getItem('token')) {
            navigate({ to: '/login' })
        }
    }, [navigate])

    function handleLogout() {
        // Cerrar sesión = borrar el token y volver al login
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate({ to: '/login' })
    }

    const {
        modalUser,
        modalMode,

        openView,
        openEdit,
        closeModal,
    } = useUserModal()

    // Handle user deletion
    async function handleDeleteUser(userId: string) {
        if (
            !confirm(
                '¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.'
            )
        ) {
            return
        }

        try {
            await deleteUserById(userId)

            closeModal()

            alert('Usuario eliminado correctamente')
        } catch (error: any) {
            alert(`Error al eliminar usuario: ${error.message}`)
        }
    }

    // Check if user can delete a specific target user
    function canDeleteUser(targetUser: User): boolean {
        const currentRole = userRole.toUpperCase()
        const targetRole = targetUser.role.toUpperCase()

        // ROOT puede eliminar a todos excepto a sí mismo (previene auto-eliminación)
        if (currentRole === 'ROOT') {
            return true // ROOT can delete anyone
        }

        // ADMIN solo puede eliminar USER y GUEST
        if (currentRole === 'ADMIN') {
            return targetRole === 'USER' || targetRole === 'GUEST'
        }

        // USER y GUEST no pueden eliminar a nadie
        return false
    }

    return (
        <main className={styles.container}>

            <video
                className={styles.backgroundVideo}
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={backgroundVideo} type="video/mp4" />
            </video>


            <div className={styles.header}>
                <h1 className={styles.title}>Usuarios</h1>
                <div className={styles.thisUser}>

                    <div className={styles.thisUserEmail}>
                        Tu email: &ensp; {/* <span className={styles.spanEmail}>{userEmail} </span> */}
                        <div className={styles.spanEmail}>
                            {userEmail}
                        </div>
                    </div>
                    <div className={styles.thisUserRol}>
                        Tu rol: &ensp;
                        <div className={`${styles.badge} ${styles[`badge__${userRole.toLowerCase()}`] ?? ''}`}>
                            {userRole}
                        </div>
                    </div>

                </div>
                <div className={styles.headerActions}>
                    <Button variant="terciary" onClick={() => navigate({ to: '/create-user' })}><span className={styles.plus}>+</span> <span className={styles.agregar}>Agregar</span></Button>
                    <Button variant="secondary" onClick={handleLogout}>Cerrar sesión</Button>
                </div>
            </div>

            <div className={styles.dashboardArea}>
                {dashboardOpen ? (
                    <Dashboard
                        users={sortedUsers}
                        onClose={() => setDashboardOpen(false)}
                    />
                ) : (
                    <div className={styles.dashboardPlaceholder}>
                        <div className={styles.dashboardHeader}>
                            <Button
                                variant="smallIcon"
                                onClick={() => setDashboardOpen(true)}
                            >
                                {/* Mostrar dashboard */} <SquareArrowOutUpRight />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Estados de la petición: cargando → error → vacío → tabla */}
            {loading && <p className={styles.message}>Cargando usuarios...</p>}

            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && users.length === 0 && (
                <p className={styles.message}>No hay usuarios para mostrar</p>
            )}

            {!loading && !error && users.length > 0 && (
                <UsersTable
                    users={sortedUsers}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    onView={openView}
                    onEdit={openEdit}
                    onDelete={handleDeleteUser}
                    canDelete={canDeleteUser}
                    showDeleteButton={userRole.toUpperCase() !== 'GUEST' && userRole.toUpperCase() !== 'USER'}
                />
            )}

            {!loading && !error && users.length > 0 && (

                <UserCards
                    users={sortedUsers}
                    onView={openView}
                    onEdit={openEdit}
                    onDelete={handleDeleteUser}
                    canDelete={canDeleteUser}
                    showDeleteButton={userRole.toUpperCase() !== 'GUEST' && userRole.toUpperCase() !== 'USER'}
                />

            )}

            <Modal
                isOpen={modalMode !== null}
                onClose={closeModal}
                title={modalMode === 'view' ? 'Detalle de usuario' : 'Editar usuario'}
            >
                {modalMode === 'view' && modalUser &&
                    <UserDetails
                        user={modalUser}
                    />}
                {modalMode === 'edit' && modalUser && (
                    <UserEditForm
                        user={modalUser}
                        onCancel={closeModal}
                        onSaved={handleUserUpdated}
                        onDelete={handleDeleteUser}
                        canDelete={canDeleteUser(modalUser)}
                    />
                )}
            </Modal>

        </main>
    )
}

// ------------------------------------------------------------
// Vista "Ver": detalle de usuario en modo solo lectura
// ------------------------------------------------------------


export default Home