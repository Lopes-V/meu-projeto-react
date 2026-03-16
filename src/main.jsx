import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' // Importações novas
import Login from './login/login'
import Home from './home/home'
import Pedido from './Pedido/pedido'
import Pessoa from './Pessoa/pessoa'
import Produto from './Produto/produto'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/pessoa" element={<Pessoa />} />
        <Route path="/produto" element={<Produto />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)