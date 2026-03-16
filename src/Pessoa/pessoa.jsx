import { useState, useEffect } from "react"; // Adicionei useEffect para carregar a lista ao abrir
import { useNavigate } from "react-router-dom";
import "./style.css";

function Pessoa() {
  const [idPessoa, setIdPessoa] = useState("");
  const [nome, setNome] = useState("");
  const [listPessoa, setListPessoas] = useState([]); // Nome correto do estado
  const navigate = useNavigate();
  const URL_API = "http://localhost:8080";

  async function pegarPessoas() {
    try {
      const resposta = await fetch(URL_API + "/pessoa");
      const dados = await resposta.json();
      setListPessoas(dados);
    } catch (erro) {
      alert("Erro ao pegar as pessoas: " + erro);
      console.error("Erro ao pegar as pessoas", erro);
    }
  }

  // Carregar os pedidos assim que a tela abrir
  useEffect(() => {
    pegarPessoas();
  }, []);

  // O endpoint de criação de pessoa
  async function criarPessoa(event) {
    event.preventDefault();
    const dados = { idPessoa, nome };

    try {
      const resposta = await fetch(URL_API + "/pessoa/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (resposta.ok) {
        pegarPessoas();
      }
    } catch (erro) {
      alert("Erro ao conectar: " + erro);
      console.error("Erro ao conectar:", erro);
    }
  }

  // Função para deletar pessoa
  async function deletarPessoa(event) {
    event.preventDefault();
    try {
      const resposta = await fetch(`${URL_API}/pessoa/deletar/${idPessoa}`, {
        method: "DELETE",
      });
      if (resposta.ok) {
        pegarPessoas();
        console.log("Deletado com sucesso");
      }
    } catch (erro) {
      alert("Erro ao conectar: " + erro);
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
          <h1>PESSOAS</h1>
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
          </ul>
        </div>
      </header>
      {/* Formulário para criar pessoa */}
      <div className="formulario">
        <form onSubmit={criarPessoa} method="post">
          <input
            placeholder="Nome"
            type="text"
            onChange={(e) => setNome(e.target.value)}
          />
          <button type="submit">Criar Pessoa</button>
        </form>
      </div>

      {/* Formulário para deletar pessoa */}
      <div className="formulario">
        <form onSubmit={deletarPessoa} method="post">
          <input type="number" onChange={(e) => setIdPessoa(e.target.value)} />
          <button type="submit">Deletar Pessoa</button>
        </form>
      </div>

      {/* Formulário para listar pessoas */}
      <h2>Lista de Pessoas</h2>
      <div id="listPessoas">
        <ul>
          {listPessoa.map((p, index) => (
            <li key={index}>
              <p>ID pessoa</p>
              Pessoa: {p.id}
              <p>Nome</p>
              Nome: {p.nome}
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Pessoa;
