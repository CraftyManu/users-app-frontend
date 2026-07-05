import { Link } from '@tanstack/react-router'
import styles from './LoginForm.module.css'
import Button from '@/components/ui/Button/Button' /* import Navigation from '@/components/blocks/Navigation/Navigation' */


function LoginForm() {
    return (
        <div className={styles.form}>
            <h1 className={styles.title}>Iniciar Sesión</h1>
            <p className={styles.subtitle}>Ingresá tu email y contraseña para continuar</p>

            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} id="email" type="email" placeholder='tu@email.com' />

            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input className={styles.input} id='password' type="password" placeholder='contraseña' />

            <Button variant='primary' type='submit'>Iniciar Sesión</Button>

            <p className={styles.footer}>
                ¿No tenés cuenta? <Link to='/register'>Registrate</Link>
            </p>
        </div>
    )
}

export default LoginForm


