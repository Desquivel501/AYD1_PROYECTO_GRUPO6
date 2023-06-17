import { DataGrid } from "@mui/x-data-grid";
import mock from "../../mocks/usuarios.json";
import "./solicitudes.css";
import { useState } from "react";
const columns = [
  { field: "id", headerName: "Correo", width: 250 },
  {
    field: "first_name",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "last_name",
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
  const estados = {
    "0": "Deshabilitado",
    "1": "Habilitado",
    "2": "Baneado",
  };
  const roles = {
    "0": "Administrador",
    "1": "Empresa",
    "2": "Repartidor",
    "3": "Cliente",
  };
  const filtroUsuarios = (data) => {
    return data.map((value) => ({ ...value, rol:roles[value.rol], estado: estados[value.estado] }));
  };
  return (
    <section style={{ height: "400px", marginTop: "100px" }}>
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
