import { DataGrid } from "@mui/x-data-grid";
import mock from "../../mocks/usuarios.json";
import "./solicitudes.css";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../../api/auth";
const columns = [
  { field: "id", headerName: "Correo", width: 250 },
  {
    field: "nombre",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "apellidos",
    headerName: "Apellido",
    width: 150,
  },
  {
    field: "rol",
    headerName: "Rol",
    width: 110,
  },
  {
    field: "fecha_registro",
    headerName: "Fecha Registro",
    type: "Date",
    sortable: true,
    width: 160,
  },
  {
    field: "estado",
    headerName: "Estado",
    sortable: true,
    width: 160,
  },
];
export function Usuarios() {
  const [usuarios, setUsuarios] = useState(mock);
  useEffect(() => {
    const endpoint = "ObtenerUsuarios";
    getData({ endpoint })
      .then((data) => setUsuarios(data))
      .catch((e) => console.log(e));
  }, []);
  const estados = {
    "0": "Pendiente",
    "1": "Habilitado",
    "2": "Deshabilitado",
  };
  const roles = {
    "0": "Administrador",
    "1": "Cliente",
    "2": "Repartidor",
    "3": "Empresa",
  };
  const filtroUsuarios = (data) => {
    return data.map((value) => ({
      ...value,
      rol: roles[value.rol],
      estado: estados[value.estado],
      fecha_registro: new Date(value.fecha_registro).toLocaleDateString("en-GB"),
    }));
  };
  return (
    <section style={{ height: "100%", marginTop: "100px" }}>
      <h1>Reporte de usuarios</h1>
      <p>Usuarios: {usuarios.length}</p>
      <DataGrid
        rows={filtroUsuarios(usuarios)}
        columns={columns}
        className="tabla mensaje"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[10, 5]}
        disableRowSelectionOnClick
        disableColumnMenu
      />
    </section>
  );
}
