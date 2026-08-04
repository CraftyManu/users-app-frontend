import { useState } from 'react'
import GoogleMap from '@/components/ui/GoogleMap/GoogleMap'
import type { User } from '@/api/types'
import { MapPin } from 'lucide-react'
import styles from './MapOnHover.module.css'



function MapOnHover({ user }: { user: User }) {
    const [showMap, setShowMap] = useState(false)

    return (
        <div 
            onMouseEnter={() => setShowMap(true)}
            onMouseLeave={() => setShowMap(false)}
        >

            <div className={styles.row}>
                <MapPin size={16} /> &ensp;
                <span>
                    <span>{user.localidad}, {user.provincia}, {user.pais}</span>
                </span>
            </div>


            {showMap && <GoogleMap user={user} />}
        </div>
    )
}

export default MapOnHover





