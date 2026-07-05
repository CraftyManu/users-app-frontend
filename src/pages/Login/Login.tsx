/* import { Link } from '@tanstack/react-router' */
import styles from './Login.module.css'
/* import Button from '@/components/ui/Button/Button'  */
import LoginForm from '@/components/blocks/Login/Form/LoginForm'
import RightSide from '@/components/blocks/Login/RightSide/RightSide'

function Login() {
    return (
        <main className={`${styles.container} ${styles.main}`}>
            <section className={styles.left}>
                <LoginForm />
            </section>
            <section className={styles.right}>
                <RightSide />
            </section>
        </main>
    )
}

export default Login