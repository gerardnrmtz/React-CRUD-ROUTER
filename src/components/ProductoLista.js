import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

function ProductoLista({ producto, guardarRecargarProductos }) {
  const eliminarProducto = async id => {
    console.log("Eliminando" + id);
    //TODO:elminar los registros

    Swal.fire({
      title: "Estas Seguro?",
      text: "Un platillo eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si,Eliminar!",
      cancelButtonText: "Cancelar"
    }).then(async result => {
      if (result.value) {
        //enviar peticion
        const url = `http://192.168.0.13:400/restaurant/${id}`;

        try {
          const resultado = await axios.delete(url);
          if (resultado.status == 200) {
            Swal.fire("Eliminado!", "El producoto se ha eliminado", "success");
            guardarRecargarProductos(true);
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error, vuelve a intentarlo"
          });
        }
      }
    });
  };
  return (
    <li
      className="List-group-item d-flex justify-content-between align-items-center"
      data-categoria={producto.categoria}
    >
      <p>
        {producto.nombrePlatillo}{" "}
        <span className="font-weight-bold">${producto.precioPlatillo}</span>
      </p>
      <div>
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-success mr-2"
        >
          Editar
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarProducto(producto.id)}
        >
          Elminar &times;
        </button>
      </div>
    </li>
  );
}
export default ProductoLista;
