import { MenuItem, Select } from "@mui/material";
export function FilterPedidos({ find, onChange, categorias }) {
  const handleChange = (e) => {
    const key = e.target.name.toString();
    if (key == "cliente") {
      return onChange((prev) => ({ ...prev, cliente: e.target.value }));
    }
    if (key == "fecha") {
      const x = e.target.value;
      return onChange((prev) => ({ ...prev, fecha: x == "" ? "" : x }));
    }
    if (key == "categoria") {
      return onChange((prev) => ({ ...prev, categoria: e.target.value }));
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
      {categorias?.length && (
        <>
          <label>Por estado:</label>
          <Select
            onChange={handleChange}
            defaultValue="Todos"
            name="categoria"
            sx={{ height: "35px", width: "150px" }}
          >
            {categorias.map(({ value, texto }) => (
              <MenuItem key={value} value={value}>{texto}</MenuItem>
            ))}
          </Select>
        </>
      )}
    </div>
  );
}
