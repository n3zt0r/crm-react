import { Form, redirect, useNavigate } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export async function action({ params }) {
  await eliminarCliente(params.clienteId);
  return redirect("/");
}

function Cliente({ cliente }) {
  const navigate = useNavigate();
  const { _id, name, phone, email, company } = cliente;

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{name}</p>
        <p>{company}</p>
      </td>

      <td className="p-6">
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Tel: </span>
          {phone}
        </p>
      </td>

      {/*************************** Editar ***************************/}
      <td className="p-6 flex gap-3">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-sm"
          onClick={() => navigate(`/clientes/${_id}/editar`)}
        >
          Editar
        </button>

        {/*************************** Eliminar ***************************/}
        <Form
          method="post"
          action={`clientes/${_id}/eliminar`}
          onSubmit={(e) => {
            if (!confirm("¿Deseas eliminar este registro?")) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-bold text-sm"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
}

Cliente.propTypes = String;

export default Cliente;
