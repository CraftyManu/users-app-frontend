import { RouterProvider } from '@tanstack/react-router' //libreria para manejar las rutas
import { router } from '@/router'

function App() {
    return <RouterProvider router={router} />
}

export default App