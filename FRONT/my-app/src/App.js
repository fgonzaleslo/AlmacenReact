import './App.css';
import {Inicio} from './Inicio.js';
import {Almacen} from './Almacen.js';
import {Producto} from './Producto.js';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Registro
      </h3>

      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav"> 
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/inicio">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/almacen">
              Almacen
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/producto">
              Producto
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='inicio' component={Inicio}/>
        <Route path='/almacen' component={Almacen}/>
        <Route path='/producto' component={Producto}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
