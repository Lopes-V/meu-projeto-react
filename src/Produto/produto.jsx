import { useState, useEffect } from "react"; // Adicionei useEffect para carregar a lista ao abrir
import { useNavigate } from "react-router-dom";
import "./style.css";

function Produto() {
  const [idProduto, setIdProduto] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [listProduto, setListProdutos] = useState([]); // Nome correto do estado
  const navigate = useNavigate();
  const URL_API = "http://localhost:8080";

  async function pegarProdutos() {
    try {
      const resposta = await fetch(URL_API + "/produto");
      const dados = await resposta.json();
      setListProdutos(dados);
    } catch (erro) {
      alert("Erro ao pegar os produtos: " + erro);
      console.error("Erro ao pegar os produtos", erro);
    }
  }

  // Carregar os produtos assim que a tela abrir
  useEffect(() => {
    pegarProdutos();
  }, []);

  // O endpoint de criação de produto
  async function criarProduto(event) {
    event.preventDefault();
    const dados = { nomeProduto };

    try {
      const resposta = await fetch(URL_API + "/produto/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (resposta.ok) {
        pegarProdutos();
      }
    } catch (erro) {
      alert("Erro ao conectar: " + erro);
      console.error("Erro ao conectar:", erro);
    }
  }

  // Função para deletar produto
  async function deletarProduto(event) {
    event.preventDefault();
    try {
      const resposta = await fetch(`${URL_API}/produto/deletar/${idProduto}`, {
        method: "DELETE",
      });
      if (resposta.ok) {
        pegarProdutos();
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
          <h1>PRODUTOS</h1>
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
      {/* Formulário para criar produto */}
      <div className="formulario">
        <form onSubmit={criarProduto} method="post">
          <input
            placeholder="Nome Produto"
            type="text"
            onChange={(e) => setNomeProduto(e.target.value)}
          />
          <button type="submit">Criar Produto</button>
        </form>
      </div>

      {/* Formulário para deletar produto */}
      <div className="formulario">
        <form action="" method="post">
          <input type="number" onChange={(e) => setIdProduto(e.target.value)} />
          <button type="submit">Deletar Produto</button>
        </form>
      </div>

      {/* Lista de produtos */}
      <h2>Lista de Produtos</h2>
      <div id="listProdutos">
        <ul>
          {listProduto.map((p, index) => (
            <li key={index}>
              <p>ID produto</p>
              Produto: {p.id}
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

export default Produto;
