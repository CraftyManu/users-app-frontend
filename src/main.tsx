import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


//Styles // styles se instala primero para evitar parpadeos blancos
import '@/styles/global.css'

//App
import App from '@/App'
//se inserta en el div id=root del index.html

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)