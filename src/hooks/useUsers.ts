import { useEffect, useMemo, useState } from 'react'
import { getUsers } from '@/api/getUsers'
import { deleteUser } from '@/api/deleteUser'
import type { User } from '@/api/types'

export type SortKey =
    | 'nombre'
    | 'email'
    | 'edad'
    | 'genero'
    | 'localidad'
    | 'role'

export type SortDirection = 'asc' | 'desc'

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [sortConfig, setSortConfig] = useState<{
        key: SortKey
        direction: SortDirection
    }>({
        key: 'nombre',
        direction: 'asc',
    })

    async function loadUsers() {
        try {
            setLoading(true)

            const data = await getUsers()
            // Pedimos los usuarios a la API al montar el componente

            setUsers(data)
            setError(null)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    function handleSort(key: SortKey) {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction:
                        prev.direction === 'asc'
                            ? 'desc'
                            : 'asc',
                }
            }

            return {
                key,
                direction: 'asc',
            }
        })
    }

    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => {
            const aValue = String(
                a[sortConfig.key] ?? ''
            ).toLocaleLowerCase()

            const bValue = String(
                b[sortConfig.key] ?? ''
            ).toLocaleLowerCase()

            const comparison =
                aValue.localeCompare(bValue)

            return sortConfig.direction === 'asc'
                ? comparison
                : -comparison
        })
    }, [users, sortConfig])

    function handleUserUpdated(updated: User) {
        console.log('function handleUserUpdated')
        setUsers((prev) =>
            prev.map((user) =>
                user._id === updated._id
                    ? updated
                    : user
            )
        )
    }

    async function deleteUserById(id: string) {
        await deleteUser(id)

        setUsers((prev) =>
            prev.filter((user) => user._id !== id)
        )
    }

    return {
        users,
        loading,
        error,

        sortConfig,
        sortedUsers,

        loadUsers,

        handleSort,
        handleUserUpdated,

        deleteUserById,
    }
}