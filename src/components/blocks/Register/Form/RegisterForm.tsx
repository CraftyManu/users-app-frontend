import { Link } from '@tanstack/react-router'
import styles from './RegisterForm.module.css'
import Button from '@/components/ui/Button/Button' /* import Navigation from '@/components/blocks/Navigation/Navigation' */
import Title from '@/components/ui/Title/Title'
import Subtitle from '@/components/ui/Subtitle/Subtitle'
import Footer from '@/components/ui/Footer/Footer'

function RegisterForm() {
    return (
        <div className={styles.form}>
            <Title>Crear Cuenta</Title>
            <Subtitle>Completá tus datos para registrarte</Subtitle>

            <label className={styles.label} htmlFor="nombre">Nombre</label>
            <input className={styles.input} id="nombre" type="text" placeholder='Nombre' />

            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} id="email" type="email" placeholder='tu@email.com' />

            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input className={styles.input} id='password' type="password" placeholder='contraseña' />

            <Button variant='primary' type='submit'>Registrarse</Button>

            <Footer>¿Ya tenés cuenta? <Link to='/login'>Iniciá Sesión</Link> </Footer>
        </div>
    )
}

export default RegisterForm


