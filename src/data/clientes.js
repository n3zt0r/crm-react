// const url = "http://localhost:3000/clients";
const url = "https://api-mongodb-clientes.onrender.com/clients";

export async function obtenerClientes() {
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();

  return resultado.data;
}

export async function obtenerCliente(id) {
  const respuesta = await fetch(`${url}/${id}`);
  const resultado = await respuesta.json();

  return resultado;
}

export async function agregarCliente(datos) {
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(datos),
    });
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarCliente(id, datos) {
  try {
    const respuesta = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: new URLSearchParams(datos),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export async function eliminarCliente(id) {
  try {
    const respuesta = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
