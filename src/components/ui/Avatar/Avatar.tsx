import { useEffect, useState } from 'react';
import defaultAvatar from '@/assets/images/default-avatar.png';
import styles from './Avatar.module.css';

interface AvatarProps {
    avatarURL?: string | null;
    userUrl?: string | null;
    genero?: string | null;
    nombre: string | null;
    apellido: string | null;
}

function Avatar({ avatarURL, userUrl, genero, nombre, apellido }: AvatarProps) {
    const genderParam = genero === 'Masculino' ? 'male' : genero === 'Femenino' ? 'female' : undefined;

    const style =
    genderParam === 'female'
        ? 'avataaars'
        : genderParam === 'male'
        ? 'toon-head'
        : 'lorelei';

    const imageSrc =
        avatarURL ||
        userUrl ||
        `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(
            `${nombre} ${apellido}`
        )}`;

        `https://randomuser.me/api/?inc=picture&noinfo${genderParam ? `&gender=${genderParam}` : ''}`;

    /* const [imageSrc, setImageSrc] = useState<string>(avatarURL || defaultAvatar);

    useEffect(() => {
        let isMounted = true;

        const loadAvatar = async () => {
            if (avatarURL) {
                if (isMounted) {
                    setImageSrc(avatarURL);
                }
                return;
            }

            const normalizedGender = genero?.toLowerCase();
            const genderParam = normalizedGender === 'masculino' || normalizedGender === 'male' || normalizedGender === 'hombre' ? 'male' : normalizedGender === 'femenino' || normalizedGender === 'female' || normalizedGender === 'mujer' ? 'female' : undefined;
            const endpoint = userUrl || `https://randomuser.me/api/?inc=picture&noinfo${genderParam ? `&gender=${genderParam}` : ''}`;

            try {
                const response = await fetch(endpoint);
                if (!response.ok) throw new Error('No se pudo cargar la imagen');

                const payload = await response.json();
                const pictureUrl =
                    payload?.results?.[0]?.picture?.thumbnail ||
                    payload?.results?.[0]?.picture?.medium ||
                    payload?.picture?.thumbnail ||
                    payload?.picture?.medium ||
                    payload?.image?.url;

                if (isMounted) {
                    setImageSrc(pictureUrl || defaultAvatar);
                }
            } catch {
                if (isMounted) {
                    setImageSrc(defaultAvatar);
                }
            }
        };

        void loadAvatar();

        return () => {
            isMounted = false;
        };
    }, [avatarURL, userUrl]); */


    const altText = [nombre, apellido].filter(Boolean).join(' ').trim() || 'Usuario';



    return (
        <img
            className={styles.avatar}
            src={imageSrc}
            alt={altText}
            onError={(e) => {
                e.currentTarget.src = defaultAvatar;
            }
            }
        />
    );
}

export default Avatar;