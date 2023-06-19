import { Box, Button } from "@mui/material";
import { useState } from "react";
import "./solicitudes.css";
import repartidores from "../../mocks/repartidores.json";
import empresas from "../../mocks/empresas.json";
import { PersonAttribute } from "../../Componentes/Persona";
import { useSesion } from "../../hooks/useSesion";
import { aceptarSolicitud, getData } from "../../api/auth";
import { useEffect } from "react";

export function Solicitudes() {
  const { user } = useSesion();
  const [reporte, setReporte] = useState("Usuarios");

  const handleClick = (e) => {
    setReporte(e.target.innerText);
    document.querySelectorAll("button").forEach((element) => {
      if (element.classList.contains("enable")) {
        element.classList.remove("enable");
      }
    });
    e.target.classList.add("enable");
  };
  const submitAceptar = async (email, aceptado, entidad) => {
    if (email) {
      console.log(user)
      const respuesta = await aceptarSolicitud({
        admin: user.id,
        email,
        aceptado,
      }, entidad);
      console.log(respuesta);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <h1>Solicitudes</h1>
      <div className="tabbed-buttons">
        <button type="button" className="tabbed-button" onClick={handleClick}>
          Repartidores
        </button>
        <button type="button" className="tabbed-button" onClick={handleClick}>
          Empresas
        </button>
      </div>
      {reporte === "Repartidores" &&
        (
          <Solicitud
            id={"correo"}
            fields={campos}
            title={"Solicitantes"}
            documento="document"
            handleSubmit={submitAceptar}
            usuario={"Repartidor"}
          />
        )}
      {reporte === "Empresas" &&
        (
          <Solicitud
            id={"correo"}
            fields={camposEmpresas}
            title={"Solicitantes"}
            documento="document"
            handleSubmit={submitAceptar}
            usuario={"Empresa"}
          />
        )}
    </Box>
  );
}

const camposEmpresas = [
  { id: "name", label: "Nombre", name: "nombre" },
  { id: "description", label: "Descripción", name: "description" },
  { id: "email", label: "Correo", name: "correo" },
  { id: "password", label: "Contraseña", name: "contrasenia" },
  { id: "address", label: "Dirección", name: "direccion" },
];
const campos = [
  { id: "name", label: "Nombre", name: "nombre" },
  { id: "last_name", label: "Apellido", name: "apellidos" },
  { id: "email", label: "Correo", name: "correo" },
  { id: "password", label: "Contraseña", name: "contrasenia" },
  { id: "phone", label: "Celular", name: "phone" },
  { id: "address", label: "Dirección", name: "direccion" },
  { id: "licencia", label: "Licencia", name: "licencia" },
];
function Solicitud(
  { id, fields, title, documento, handleSubmit, usuario },
) {
  const [entidad, setEntidad] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {
    const endpoint = usuario == "Empresa"
      ? "SolicitudesEmpresas"
      : "SolicitudesRepartidores";
    getData({ endpoint }).then((data) => setData(data))
      .catch((e) => console.log(e));
  }, []);
  const handleClick = (e) => {
    const entidadSeleccionado = data.find((value) =>
      value[id] == e.target.innerText
    );
    if (entidadSeleccionado != undefined) {
      setEntidad(entidadSeleccionado);
      console.log(entidadSeleccionado);
    }
  };
  return (
    <section className="panel-repartidores">
      <div style={{ width: "40%", maxHeight: "70vh" }}>
        <h2>{title}</h2>
        <div className="lista-repartidores">
          {data.map((value) => (
            <div
              className="item-repartidores"
              key={value[id]}
              onClick={handleClick}
            >
              {value[id] ? value[id] : value.name}
            </div>
          ))}
        </div>
      </div>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          width: "55%",
          borderLeft: "1px solid black",
          paddingLeft: "15px",
        }}
      >
        {fields.map(({ id, label, name }) => (
          <PersonAttribute
            key={id}
            attribute={label}
            value={entidad[name] ?? ""}
          />
        ))}
        {documento &&
          (
            <PersonAttribute attribute={"Documento"}>
              <a
                href={entidad[documento]}
                target="_blank"
                className="enlace"
              >
                Ver documento
              </a>
            </PersonAttribute>
          )}
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ margin: "10px 0", bgcolor: "#F2890D" }}
          onClick={() => handleSubmit(entidad[id], true, usuario)}
        >
          Aprobar
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ bgcolor: "#999" }}
          onClick={() => handleSubmit(entidad[id], false, usuario)}
        >
          Rechazar
        </Button>
      </Box>
    </section>
  );
}
