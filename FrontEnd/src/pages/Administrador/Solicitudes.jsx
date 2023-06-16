import { Box, Button } from "@mui/material";
import { useState } from "react";
import "./solicitudes.css";
import repartidores from "../../mocks/repartidores.json";
import empresas from "../../mocks/empresas.json";
import { PersonAttribute } from "../../Componentes/Persona";
import { useSesion } from "../../hooks/useSesion";

export function Solicitudes() {
  const [reporte, setReporte] = useState("Usuarios");
  const { userId } = useSesion("Administrador");

  const handleClick = (e) => {
    setReporte(e.target.innerText);
    document.querySelectorAll("button").forEach((element) => {
      if (element.classList.contains("enable")) {
        element.classList.remove("enable");
      }
    });
    e.target.classList.add("enable");
  };
  const submitAceptar = (email, aceptado) => {
    if (email) {
      fetch("http://localhost/aceptar-solicitud", {
        method: "POST",
        body: JSON.stringify({ email, aceptado }),
      });
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
          Usuarios
        </button>
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
            id={"email"}
            fields={campos}
            data={repartidores}
            title={"Solicitantes"}
            documento="document"
            handleSubmit={submitAceptar}
          />
        )}
      {reporte === "Empresas" &&
        (
          <Solicitud
            id={"email"}
            fields={camposEmpresas}
            data={empresas}
            title={"Solicitantes"}
            documento="document"
            handleSubmit={submitAceptar}
          />
        )}
    </Box>
  );
}

const camposEmpresas = [
  { id: "name", label: "Nombre", name: "name" },
  { id: "description", label: "Descripción", name: "description" },
  { id: "email", label: "Correo", name: "email" },
  { id: "password", label: "Contraseña", name: "password" },
  { id: "address", label: "Dirección", name: "address" },
];
const campos = [
  { id: "name", label: "Nombre", name: "name" },
  { id: "last_name", label: "Apellido", name: "last_name" },
  { id: "email", label: "Correo", name: "email" },
  { id: "password", label: "Contraseña", name: "password" },
  { id: "phone", label: "Celular", name: "phone" },
  { id: "address", label: "Dirección", name: "address" },
  { id: "licencia", label: "Licencia", name: "licencia" },
];
function Solicitud({ id, fields, data, title, documento, handleSubmit }) {
  const [entidad, setEntidad] = useState({});
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
          onClick={() => handleSubmit(entidad[id], true)}
        >
          Aprobar
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ bgcolor: "#999" }}
          onClick={() => handleSubmit(entidad[id], false)}
        >
          Rechazar
        </Button>
      </Box>
    </section>
  );
}
