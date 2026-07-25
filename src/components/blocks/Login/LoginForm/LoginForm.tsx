import { Link } from '@tanstack/react-router'
import styles from './LoginForm.module.css'
import Button from '@/components/ui/Button/Button'
import Title from '@/components/ui/Title/Title'
import Subtitle from '@/components/ui/Subtitle/Subtitle'
import Footer from '@/components/ui/Footer/Footer'
import { useState } from 'react'
import { useNavigate } from "@tanstack/react-router"
import { login } from '@/api/login'

function LoginForm() {
    const navigate = useNavigate()

    // Inputs controlados: React es la fuente de verdad del valor
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault() // Evita que el navegador recargue la página
        setError(null)
        setLoading(true)
        try {
            const data = await login(email, password)
            // Guardamos el token para las futuras peticiones autenticadas
            localStorage.setItem('token', data.token)
            localStorage.setItem('role', data.role)
            navigate({ to: '/' })
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.form} onSubmit={handleSubmit}>
            <Title>Iniciar Sesión</Title>
            <Subtitle>Ingresá tu email y contraseña para continuar</Subtitle>
            <form action="">

                <label className={styles.label} htmlFor="email">Email</label>
                <input
                    className={styles.input}
                    id="email"
                    type="email"
                    placeholder='tu@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className={styles.label} htmlFor="password">Contraseña</label>
                <input
                    className={styles.input}
                    id='password'
                    type="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Mensaje de error que viene del backend */}
                {error && <p className={styles.error}>{error}</p>}

                {/*  <div className={styles.checkboxContainer}>
                    <input type="checkbox" id="recordarme" />
                    <label className={styles.label} htmlFor="recordarme">
                        Recordarme
                    </label>
                </div> */}

                <Button variant='primary' type='submit' disabled={loading}>
                    {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                </Button>
            </form>

{/*             <Footer> ¿No tenés cuenta? <Link to='/create-user'>Registrate</Link> </Footer>
 */}        </div>
    )
}

export default LoginForm


