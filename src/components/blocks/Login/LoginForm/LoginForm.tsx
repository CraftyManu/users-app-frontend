import { Link } from '@tanstack/react-router'
import styles from './LoginForm.module.css'
import Button from '@/components/ui/Button/Button'
import Title from '@/components/ui/Title/Title'
import Subtitle from '@/components/ui/Subtitle/Subtitle'
import Footer from '@/components/ui/Footer/Footer'

function LoginForm() {
    return (
        <div className={styles.form}>
            <Title>Iniciar Sesión</Title>
            <Subtitle>Ingresá tu email y contraseña para continuar</Subtitle>

            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} id="email" type="email" placeholder='tu@email.com' />

            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input className={styles.input} id='password' type="password" placeholder='contraseña' />

            <div className={styles.checkboxContainer}>
                <input type="checkbox" id="recordarme" />
                <label className={styles.label} htmlFor="recordarme">
                    Recordarme
                </label>
            </div>


            <Button variant='primary' type='submit'>Iniciar Sesión</Button>

            <Footer> ¿No tenés cuenta? <Link to='/register'>Registrate</Link></Footer>
        </div>
    )
}

export default LoginForm


