import { Box, Button } from "@mui/material";
import { useState } from "react";
import "./solicitudes.css";
import repartidores from "../../mocks/repartidores.json";
import empresas from "../../mocks/empresas.json";
import { PersonAttribute } from "../../Componentes/Persona";
import { useSesion } from "../../hooks/useSesion";
import { aceptarSolicitud, getData, postData } from "../../api/auth";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Tabla } from "../../Componentes/Tabla/Tabla";

export function Solicitudes() {
  const { user } = useSesion();
  const [reporte, setReporte] = useState("Repartidores");
  const [cont, setCont] = useState(0);

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
      const respuesta = await aceptarSolicitud({
        admin: user.id,
        email,
        aceptado,
      }, entidad);

      if (respuesta[0].TIPO == "EXITO") {
        Swal.fire({
          icon: "success",
          title: (aceptado ? "Aceptado!" : "Rechazado"),
          text: respuesta[0].MENSAJE,
        }).then((result) => {
          if (result.isConfirmed) {
            setCont(cont + 1);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: respuesta[0].MENSAJE,
        });
      }
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
        <button type="button" className="tabbed-button" onClick={handleClick}>
          Direcciones
        </button>
      </div>
      {reporte === "Repartidores" &&
        (
          <Solicitud
            id={"correo"}
            fields={campos}
            title={"Solicitantes"}
            documento="cv"
            handleSubmit={submitAceptar}
            usuario={"Repartidor"}
            cont={cont}
          />
        )}
      {reporte === "Empresas" &&
        (
          <Solicitud
            id={"correo"}
            fields={camposEmpresas}
            title={"Solicitantes"}
            documento="doc"
            handleSubmit={submitAceptar}
            usuario={"Empresa"}
            cont={cont}
          />
        )}
      {reporte === "Direcciones" && <NuevaDireccion />}
    </Box>
  );
}

const camposEmpresas = [
  { id: "name", label: "Nombre", name: "nombre" },
  { id: "description", label: "Descripción", name: "descripcion" },
  { id: "email", label: "Correo", name: "correo" },
  { id: "password", label: "Contraseña", name: "contrasenia" },
  { id: "address", label: "Dirección", name: "direccion" },
];
const campos = [
  { id: "name", label: "Nombre", name: "nombre" },
  { id: "last_name", label: "Apellido", name: "apellidos" },
  { id: "email", label: "Correo", name: "correo" },
  { id: "password", label: "Contraseña", name: "contrasenia" },
  { id: "celular", label: "Celular", name: "celular" },
  { id: "address", label: "Dirección", name: "direccion" },
  { id: "licencia", label: "Licencia", name: "tipo_licencia" },
];
function Solicitud(
  { id, fields, title, documento, handleSubmit, usuario, cont },
) {
  const [entidad, setEntidad] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const endpoint = usuario == "Empresa"
      ? "SolicitudesEmpresas"
      : "SolicitudesRepartidores";
    getData({ endpoint }).then((data) => setData(data ?? []))
      .catch((e) => console.log(e));
    setEntidad([]);
  }, [cont]);

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
      <div style={{ maxHeight: "65vh" }}>
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
          width: "60vh",
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
const HEADERS = [
  "Correo",
  "Departamento",
  "Municipio",
  "Dirección",
  "Motivo",
  "¿Aceptar?",
  "¿Rechazar?",
];

const objectAttributes = [
  "correo",
  "departamento",
  "municipio",
  "direccion",
  "motivo",
];

function NuevaDireccion() {
  const [direcciones, setDirecciones] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const endpoint = "obtenerReasignaciones";
    getData({ endpoint })
      .then((data) => setDirecciones(data ?? []))
      .catch((e) => console.log(e));
  }, [refresh]);

  const handleClick = (e, endpoint) => {
    const parent = e.currentTarget.parentElement.parentElement;
    const id = parent.firstChild;
    const data = { correo: id.innerText };
    postData({ endpoint, data })
      .then((response) => {
        const mensaje = response[0][0];
        if (mensaje.TIPO == "EXITO") {
          Swal.fire({
            icon: "success",
            title: "Acción exitosa",
            text: mensaje.MENSAJE,
          });
          setRefresh(!refresh);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: mensaje.MENSAJE,
          });
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <section className="panel-repartidores" style={{ width: "170vh" }}>
      <Tabla
        headers={HEADERS}
        fields={objectAttributes}
        data={direcciones}
      >
        <td>
          <button
            className="btn-enable"
            onClick={(e) => handleClick(e, "aceptarReasignacion")}
          >
            Aceptar
          </button>
        </td>
        <td>
          <button
            className="btn-disable"
            onClick={(e) => handleClick(e, "rechazarReasignacion")}
          >
            Rechazar
          </button>
        </td>
      </Tabla>
    </section>
  );
}
