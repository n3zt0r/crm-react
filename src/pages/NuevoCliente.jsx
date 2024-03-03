import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({ request }) {
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
  let regex = new RegExp(
    // eslint-disable-next-line no-control-regex
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
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

  // Agregar cliente
  const result = await agregarCliente(data);

  // Retornar datos si hay error al actualizar
  if (result.error) {
    errores.push("Los datos son incorrectos");
    return errores;
  }

  return redirect("/");
}

function NuevoCliente() {
  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-10">
        Llena todos los campos para registrar un nuevo cliente
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
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Registrar cliente"
          ></input>
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
