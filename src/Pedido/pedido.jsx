import { useState, useEffect } from "react"; // Adicionei useEffect para carregar a lista ao abrir
import { useNavigate } from "react-router-dom";
import "./style.css";

function Pedido() {
  const [idProduto, setIdProduto] = useState("");
  const [idPessoa, setIdPessoa] = useState("");
  const [id, setId] = useState("");
  const [listPedido, setListPedidos] = useState([]); // Nome correto do estado
  const navigate = useNavigate();
  const URL_API = "http://localhost:8080";

  async function pegarPedidos() {
    try {
      const resposta = await fetch(URL_API + "/pedido");
      const dados = await resposta.json();
      setListPedidos(dados);
    } catch (erro) {
      console.error("Erro ao pegar os pedidos", erro);
    }
  }

  // Carregar os pedidos assim que a tela abrir
  useEffect(() => {
    pegarPedidos();
  }, []);

  async function criarPedido(event) {
    event.preventDefault();
    const dados = { idProduto, idPessoa };

    try {
      const resposta = await fetch(URL_API + "/pedido/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (resposta.ok) {
        pegarPedidos(); // Atualiza a lista após criar
        navigate("/home");
      }
    } catch (erro) {
      console.error("Erro ao conectar:", erro);
    }
  }

  async function deletarPedido(event) {
    event.preventDefault();
    try {
      const resposta = await fetch(URL_API + "/pedido/deletar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (resposta.ok) {
        pegarPedidos();
        console.log("Deletado com sucesso");
      }
    } catch (erro) {
      console.log("Erro ao conectar:", erro);
    }
  }

  return (
    <div>
      <form onSubmit={criarPedido}>
        <input
          placeholder="ID Produto"
          onChange={(e) => setIdProduto(e.target.value)}
        />
        <input
          placeholder="ID Pessoa"
          onChange={(e) => setIdPessoa(e.target.value)}
        />
        <button type="submit">Criar Pedido</button>
      </form>

      <hr />

      <h2>Lista de Pedidos</h2>
      <ul>
        {listPedido.map((p, index) => (
          <li key={index}>
            Pedido: {p.id} - Produto: {p.idProduto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pedido;
