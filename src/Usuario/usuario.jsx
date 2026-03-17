import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style-pages.css";

export default function Usuario() {
  const [idUsuario, setIdUsuario] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [senha, setSenha] = useState("");
  const [listUsuarios, setListUsuarios] = useState([]);
  const navigate = useNavigate();

  const URL_API = "http://localhost:8080";

  async function pegarUsuarios() {
    try {
      const resposta = await fetch(`${URL_API + "/usuario"}`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setListUsuarios(dados);
      }
    } catch (erro) {
      console.error("Erro ao pegar os usuarios", erro);
    }
  }

  useEffect(() => {
    pegarUsuarios();
  }, []);

  async function criarUsuario(event) {
    event.preventDefault();
    const dados = { name, email, role, senha };

    try {
      const resposta = await fetch(`${URL_API + "/usuario/criar"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (resposta.ok) {
        pegarUsuarios(); // Atualiza a lista após criar
      }
    } catch (erro) {
      console.error("Erro ao conectar:", erro);
    }
  }

  // Função para deletar usuario
  async function deletarUsuario(event) {
    event.preventDefault();
    try {
      const resposta = await fetch(`${URL_API}/usuario/deletar/${idUsuario}`, {
        method: "DELETE",
      });
      if (resposta.ok) {
        pegarUsuarios();
        console.log("Deletado com sucesso");
      }
    } catch (erro) {
      console.log("Erro ao conectar:", erro);
    }
  }

  // Função para lidar com cliques nos links do cabeçalho
  function handleLinkClick(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    navigate(href);
  }
  return (
    <div>
      {/* Cabeçalho */}
      <header>
        <div id="container-header">
          <h1>USUARIO</h1>
          <ul>
            <li>
              <a href="/pedido" onClick={handleLinkClick}>
                Pedido
              </a>
            </li>
            <li>
              <a href="/pessoa" onClick={handleLinkClick}>
                Pessoa
              </a>
            </li>
            <li>
              <a href="/produto" onClick={handleLinkClick}>
                Produto
              </a>
            </li>
            <li>
              <a href="/usuario" onClick={handleLinkClick}>
                Usuario
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* Formulário para criar pedido */}
      <div className="formulario">
        <form onSubmit={criarUsuario} method="post">
          <input
            placeholder="Nome"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Role"
            type="text"
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Criar Usuario</button>
        </form>
      </div>

      {/* Formulário para deletar usuario */}
      <div className="formulario">
        <form onSubmit={deletarUsuario} method="post">
          <input type="number" onChange={(e) => setIdUsuario(e.target.value)} />
          <button type="submit">Deletar Usuario</button>
        </form>
      </div>

      {/* Formulário para listar usuarios */}
      <h2>Lista de Usuarios</h2>
      <div id="listUsuarios">
        <ul>
          {listUsuarios.map((u, index) => (
            <li key={index}>
              ID Usuario: {u.idUsuario}
              <br />
              Nome Usuario: {u.name}
              <br />
              Email Usuario: {u.email}
              <br />
              Role Usuario: {u.role}
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
