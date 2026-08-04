import type { User } from '@/api/types'

export function getAvatar(user: User): string {
    if (user.avatarURL?.trim()) {
        return user.avatarURL
    }

    if (user.user_url?.trim()) {
        return user.user_url
    }

    const style =
        user.genero === 'Femenino'
            ? 'avataaars'
            : user.genero === 'Masculino'
                ? 'toon'
                : 'lorelei'

    return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(
        `${user.nombre} ${user.apellido}`
    )}`
}