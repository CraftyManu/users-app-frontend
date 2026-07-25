/* import { Link } from '@tanstack/react-router' */
import styles from './Register.module.css'
/* import Button from '@/components/ui/Button/Button'  */
import RightSide from '@/components/blocks/Register/RightSide/RightSide'
import CreateForm from '@/components/blocks/Register/CreateForm/CreateForm'

function Register() {
    return (
        <main className={`${styles.container} ${styles.main}`}>
            <section className={styles.left}>
                <CreateForm />
            </section>

            <section className={styles.right}>
                <RightSide />
            </section>

        </main>
    )
}

export default Register