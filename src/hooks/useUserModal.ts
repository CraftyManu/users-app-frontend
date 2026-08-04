import { useState } from 'react'
import type { User } from '@/api/types'

export type ModalMode = 'view' | 'edit' | null

export function useUserModal() {
        // Usuario seleccionado para ver o editar en el modal
    const [modalUser, setModalUser] = useState<User | null>(null)
    const [modalMode, setModalMode] = useState<ModalMode>(null)

    function openView(user: User) {
        setModalUser(user)
        setModalMode('view')
    }

    function openEdit(user: User) {
        setModalUser(user)
        setModalMode('edit')
    }

    function closeModal() {
        setModalMode(null)
        setModalUser(null)
    }

    return {
        modalUser,
        modalMode,

        openView,
        openEdit,
        closeModal,
    }
}