const API = "http://localhost:3000";
export function userLogin({ data }) {
  return fetch(`${API}/login`, {
    method: "POST",
    credentials: "include",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}
// Función para registrar usuario,empresa o repartidor
export function registrar(entidad, data) {
  const endpoint = {
    "Usuario":"registrarUsuario",
    "Empresa":"registrarEmpresa",
    "Repartidor":"registrarRepartidor",
  }
  return fetch(`${API}/${endpoint[entidad]}`, {
    method: "POST",
    credentials: "include",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}
