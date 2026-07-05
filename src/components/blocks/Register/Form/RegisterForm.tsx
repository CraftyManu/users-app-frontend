import { Link } from '@tanstack/react-router'
import styles from './RegisterForm.module.css'
import Button from '@/components/ui/Button/Button' /* import Navigation from '@/components/blocks/Navigation/Navigation' */
import Title from '@/components/ui/Title/Title'
import Subtitle from '@/components/ui/Subtitle/Subtitle'

function RegisterForm() {
    return (
        <div className={styles.form}>
            <Title>Crear Cuenta</Title>
            <Subtitle>Ingresá tu email y contraseña para continuar</Subtitle>
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

export default RegisterForm


