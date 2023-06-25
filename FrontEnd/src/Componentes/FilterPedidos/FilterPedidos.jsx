import { MenuItem, Select } from "@mui/material";
export function FilterPedidos({ find, onChange, estado = true }) {
  const handleChange = (e) => {
    const key = e.target.name.toString();
    if (key == "cliente") {
      return onChange((prev) => ({ ...prev, cliente: e.target.value }));
    }
    if (key == "fecha") {
      const x = e.target.value.split("-");
      const nuevaFecha = x.length == 1
        ? ""
        : parseInt(x[1]) + "/" + parseInt(x[2]) + "/" + x[0];
      return onChange((prev) => ({ ...prev, fecha: nuevaFecha }));
    }
    if (key == "estado") {
      return onChange((prev) => ({ ...prev, estado: e.target.value }));
    }
  };
  return (
    <div className="filter-pedidos">
      <label>Por cliente:</label>
      <input
        className="txt-find"
        value={find.cliente}
        onChange={handleChange}
        placeholder="ejemplo@email.com"
        name="cliente"
      />
      <label>Por fecha:</label>
      <input
        className="txt-find"
        type="date"
        onChange={handleChange}
        name="fecha"
      />
      {estado && (
        <>
          <label>Por estado:</label>
          <Select
            onChange={handleChange}
            defaultValue="Todos"
            name="estado"
            sx={{ height: "35px", width: "150px" }}
          >
            <MenuItem value={-1}>Todos</MenuItem>
            <MenuItem value={0}>Entregado</MenuItem>
            <MenuItem value={1}>En proceso</MenuItem>
            <MenuItem value={2}>Cancelado</MenuItem>
          </Select>
        </>
      )}
    </div>
  );
}
