import styles from './LoginForm.module.css'
import Button from '@/components/ui/Button/Button'
import Title from '@/components/ui/Title/Title'
import Subtitle from '@/components/ui/Subtitle/Subtitle'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { login } from '@/api/login'
import { Eye, EyeOff } from "lucide-react";
import DemoUsers from '@/components/ui/DemoUsers/DemoUsers'


function LoginForm() {
    const navigate = useNavigate()

    // Inputs controlados: React es la fuente de verdad del valor
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleDemoAccount = (email: string, password: string) => {
        setEmail(email)
        setPassword(password)
        setError(null)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault() // Evita que el navegador recargue la página
        setError(null)
        setLoading(true)
        try {
            const data = await login(email, password)
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
        <div className={styles.form}>
            <Title>Iniciar Sesión</Title>
            <Subtitle>Ingresá tu email y contraseña para continuar</Subtitle>
            <form onSubmit={handleSubmit}>

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

                <div className={styles.passwordField}>
                    <label className={styles.label} htmlFor="password">Contraseña</label>
                    <input
                        className={styles.input}
                        id='password'
                        type={showPassword ? "text" : "password"}
                        placeholder='Contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Mensaje de error que viene del backend */}
                {error && <p className={styles.error}>{error}</p>}

                <Button variant='primary' type='submit' disabled={loading}>
                    {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                </Button>
            </form>

            <DemoUsers onSelect={handleDemoAccount} />


            {/*             <Footer> ¿No tenés cuenta? <Link to='/create-user'>Registrate</Link> </Footer>
 */}        </div>
    )
}

export default LoginForm


