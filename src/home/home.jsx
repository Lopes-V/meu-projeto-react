import "./style.css";
import Bolsonaro from "../assets/bolsonaro.jpeg";
function Home() {
  return (
    <div>
      <header>
        <div id="container-header">
          <h1>HOME</h1>
          <ul>
            <li>
              <a href="redirect:/pedido">Pedido</a>
            </li>
            <li>
              <a href="redirect:/pessoa">Pessoa</a>
            </li>
            <li>
              <a href="redirect:/produto">Produto</a>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <h2>BOLSONARO</h2>
        <img src={Bolsonaro} alt="" />
      </main>
    </div>
  );
}
export default Home;
