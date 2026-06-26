import Navigation from '@/components/blocks/Navigation/Navigation'
import styles from './Login.module.css'

function Login() {
    return (
        <main className={`${styles.container} ${styles.main}`}>
            <Navigation />
            <h1>Hello Login</h1>
        </main>
    )
}

export default Login