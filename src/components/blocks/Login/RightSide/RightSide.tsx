import styles from './RightSide.module.css'
import fontStyles from '@/styles/fontStyles.module.css'
import Logo from '@/components/ui/Logo/Logo'

function LoginRightSide() {
    return (
        <div className={styles.rightBackground}>

            <Logo />

            {/* <div className={`${styles.textContainer} ${styles.toTop} ${styles.toRight}`}>
                <p className={`${fontStyles.grotesk} ${fontStyles.fw700}`}>UsersApp</p>
            </div> */}

            <div>
                <div className={`${styles.textContainer} ${styles.toBottom} ${styles.toLeft} ${styles.maxWidth}`}>
                    <p className={`${fontStyles.inter} ${fontStyles.fw600}`}>Tu App de Usuarios</p>
                </div>

                <div className={`${styles.textContainer} ${styles.toBottom} ${styles.toLeft}`}>
                    <p className={`${fontStyles.inter} ${fontStyles.fw400}`} >Gestiona de forma segura la información de tus usuarios.</p>
                </div>
            </div>

        </div>
    )
}

export default LoginRightSide