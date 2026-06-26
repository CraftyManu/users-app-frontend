import { defineConfig } from 'vite' // motor para compilar ReactJS
import react from '@vitejs/plugin-react' 
import path from 'path'

export default defineConfig ({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src') // cada vez que aparaece @ significa -> './src'
        },
    },
})