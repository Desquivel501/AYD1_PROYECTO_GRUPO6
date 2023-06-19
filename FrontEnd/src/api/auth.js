const API = "http://localhost:3000/";
export function userLogin({ data }) {
  return fetch(`${API}InicioSesion`, {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin_Origin': '*'
    },
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
// Función para registrar usuario,empresa o repartidor
export function registrar(entidad, data) {
  const endpoint = {
    "Usuario": "registrarUsuario",
    "Empresa": "registrarEmpresa",
    "Repartidor": "registrarRepartidor",
  };
  return fetch(`${API}/${endpoint[entidad]}`, {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin_Origin': '*'
   },
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
/*
 * Petición a la API para actualizar dirección
 * @param data Información a enviar
 * @return Promesa
 */
export function nuevaDireccion({ data }) {
  return fetch(`${API}/nuevadireccion`, {
    method: "POST",
    headers: {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin_Origin': '*'
    },
    body: data,
  })
    .then((res) => res.json())
    .catch((er) => console.log(er));
}
/*
 * Función general para obtener información por método GET
 * @params enpoint Indica de dónde queremos obtener la información
 * @returns Json con la respuesta
 * */
export function getData({ endpoint }) {
  return fetch(`${API}/${endpoint}`)
    .then((res) => res.json())
    .catch((er) => console.log(er));
}
