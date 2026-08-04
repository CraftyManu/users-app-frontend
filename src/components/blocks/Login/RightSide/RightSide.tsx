import styles from './RightSide.module.css'
import fontStyles from '@/styles/fontStyles.module.css'
import Logo from '@/components/ui/Logo/Logo'
import backgroundVideo from "@/public/videos/dna-strand.mp4";
import { useState } from 'react'

function LoginRightSide() {

    const [loaded, setLoaded] = useState(false);



    return (
        <div className={styles.rightBackground}>

{/*             <img className={styles.backgroundImage} src="https://mimostejidosartesanales.wordpress.com/wp-content/uploads/2026/07/dna-background.png" />
 */}
            <video onCanPlay={() => setLoaded(true)}
                className={styles.backgroundVideo}
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={backgroundVideo} type="video/mp4" />
            </video>

            {!loaded && (
                <img className={styles.backgroundImage} src="https://mimostejidosartesanales.wordpress.com/wp-content/uploads/2026/07/dna-background.png" />
            )}

            <div className={styles.content}>
                <Logo />
            </div>

            <>
                <div className={styles.emptySpace}></div>
                <div className={`${styles.textContainer} ${styles.toBottom} ${styles.toLeft} ${styles.maxWidth}`}>
                    <p className={`${fontStyles.inter} ${fontStyles.fw400}`}>Segura. Rápida. Escalable.</p>
                </div>

                <div className={`${styles.textContainer} ${styles.toBottom} ${styles.toLeft}`}>
                    <p className={`${fontStyles.inter} ${fontStyles.fw600}`} >Gestiona usuarios
                        sin complicaciones.</p>
                </div>
            </>

        </div>
    )
}

export default LoginRightSide