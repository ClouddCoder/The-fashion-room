import "./App.css";
import MenuPrincipal from "./componentes/MenuPrincipal";
import {NavegacionPrincipal} from "./componentes/Navegacion";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="titulo">The fashion room</h1>
        <MenuPrincipal></MenuPrincipal>
      </header>
    </div>
  );
}

export default App;
