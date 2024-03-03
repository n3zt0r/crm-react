import {
  Form,
  useNavigate,
  useLoaderData,
  redirect,
  useActionData,
} from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);

  // Manejar errores
  if (cliente.error) {
    throw new Response("", {
      status: 404,
      statusText: "No hay resultados",
    });
  }

  return cliente.data;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");
  const telefono = formData.get("phone");

  // Validación
  const errores = [];

  if (Object.values(data).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  // Validación de Email
  const regexEmail = new RegExp(
    // eslint-disable-next-line no-control-regex
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regexEmail.test(email)) {
    errores.push("El Email no es valido");
  }

  // Validación de Telefono
  const regexTel = /^[0-9]{10}$/;

  if (!regexTel.test(telefono)) {
    errores.push(
      "Ingrese un número de teléfono válido con exactamente 10 dígitos"
    );
  }

  // Retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores;
  }

  // Actualizar cliente
  const id = params.clienteId;
  const result = await actualizarCliente(id, data);

  // Retornar datos si hay error al actualizar
  if (result.error) {
    errores.push("Los datos son incorrectos");
    return errores;
  }

  return redirect("/");
}

function EditarCliente() {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-10">
        A continuación podras modificar los datos de un cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="POST" noValidate>
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Guadar Cambios"
          ></input>
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
