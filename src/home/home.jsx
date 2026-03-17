import "./home.css";
import { useNavigate } from "react-router-dom";
import Socrates from "../assets/socrates.jpeg";
function Home() {
  const navigate = useNavigate();

  function handleLinkClick(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    navigate(href);
  }

  return (
    <div>
      <header>
        <div id="container-header">
          <h1>HOME</h1>
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
      <main>
        <h2>SOCRATES</h2>
        <img src={Socrates} alt="" />
      </main>
    </div>
  );
}
export default Home;
