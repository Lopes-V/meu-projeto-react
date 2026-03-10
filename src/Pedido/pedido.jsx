import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Pedido() {
  const [idProduto, setIdProduto] = useState("");
  const [idPessoa, setIdPessoa] = useState("");
  const [id, setId] = useState("");
  const [listPessoas, setListPessoas] = useState([]);
  const navigate = useNavigate();
  const URL_API = "http://localhost:8080";

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
        const resultado = await resposta.json();
        console.log("Sucesso:", resultado);
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
        body: JSON.stringify(id),
      });
      if (resposta.ok) {
        const resultado = await resposta.json();
        console.log("Sucesso:", resultado);
      }
    } catch {
      console.log("Erro ao conectar:", erro);
    }
  }
  async function pegarPedidos(event) {
    
  }
  return <div></div>;
}
export default Pedido;
