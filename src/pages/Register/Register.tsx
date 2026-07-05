/* import { Link } from '@tanstack/react-router' */
import styles from './Register.module.css'
/* import Button from '@/components/ui/Button/Button'  */
import RightSide from '@/components/blocks/Login/RightSide/RightSide'
import RegisterForm from '@/components/blocks/Register/Form/RegisterForm'

function Register() {
    return (
        <main className={`${styles.container} ${styles.main}`}>
            <section className={styles.left}>
                <RegisterForm />
            </section>

            <section className={styles.right}>
                <RightSide />
            </section>

        </main>
    )
}

export default Register