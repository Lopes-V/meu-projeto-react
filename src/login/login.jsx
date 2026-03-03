import { useState } from "react";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const dados = {
      email: email, 
      senha: senha 
    };

    try {
      const resposta = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (resposta.ok) {
        const resultado = await resposta.json();
        alert("Login realizado!");
        console.log("Resposta do servidor:", resultado);
      } else {
        alert("E-mail ou senha incorretos.");
      }
    } catch (erro) {
      console.error("Erro ao conectar:", erro);
      alert("Não foi possível alcançar o servidor. Verifique se o Spring Boot está rodando.");
    }
  }

  return (
    <div>
      <main>
        <div id="card-main">
          <h1>LOGIN</h1>
          <div>
            <form onSubmit={handleSubmit}> 
              <div className="input">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <button type="submit">ENTRAR</button>
            </form>
            <h6>esqueci minha senha</h6>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;