import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header.js";
import Productos from "./components/Productos.js";
import EditarProducto from "./components/EditarProducto.js";
import AgregarProducto from "./components/AgregarProducto.js";
import Producto from "./components/Producto.js";

function App() {
  const [productos, guardarProductos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);
  useEffect(() => {
    if (recargarProductos) {
      //Consultar api de json-server
      const consultarApi = async () => {
        const resultado = await axios.get("http://192.168.0.13:400/restaurant");
        guardarProductos(resultado.data);
      };
      consultarApi();
    }
    //cambiar a false la recarga de los productos
    guardarRecargarProductos(false);
  }, [recargarProductos]);

  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route
            exact
            path="/productos"
            render={() => <Productos productos={productos}guardarRecargarProductos={guardarRecargarProductos} />}
          />
          <Route exact path="/nuevo-producto" 
           render={()=>(<AgregarProducto guardarRecargarProductos={guardarRecargarProductos}/>)}
             />
          <Route exact path="/productos/:id" component={Producto} />
          <Route
            exact
            path="/productos/editar/:id"
            render={props => {
              //Tomar el id del producto
              const idProducto =parseInt(props.match.params.id);
              //el producto que se pasa al state
              const producto=productos.filter(producto=>producto.id===idProducto);
              return <EditarProducto
               producto={producto[0]}
               guardarRecargarProductos={guardarRecargarProductos} />;
            }}
          />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los dereches reservados</p>
    </Router>
  );
}

export default App;
