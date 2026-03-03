import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' // Importações novas
import Login from './login/login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Quando a URL for /login, carrega o componente Login */}
        <Route path="/login" element={<Login />} />

        {/* (Opcional) Se o usuário entrar na raiz '/', ele é mandado para /login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)