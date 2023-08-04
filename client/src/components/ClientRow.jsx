import { FaEdit, FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "./mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientsQueries";
import { useConfirmationModalContext } from "./ConfirmationContextModal";
import { Button } from "react-bootstrap";

export default function ClientRow({ client, triggerEditClient }) {
  const modalContext = useConfirmationModalContext();

  const onDelete = async (event) => {
    const result = await modalContext.showConfirmation(
      "Delete Client Confirmation!",
      `This process can not be undone. Are you sure you want to delete: ${client.name} ?`
      // or you can pass JSX element as well like this
      // <div style={{border: "2px solid blue", padding: "10px"}}>
      //     <p>
      //         Are you sure you want to delete
      //         <strong>[{client.id}</strong> - <span style={{fontSize: "18px"}}><i> {client.last_name} </i></span>?
      //     </p>
      // </div>
    );
    result && deleteClient();
  };

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // use refetch to make actual refresh call uncomment below or else for optimized behavior use updatecache
    // refetchQueries: [{query: GET_CLIENTS}]
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <Button variant="danger" size="sm" onClick={onDelete}>
          <FaTrash />
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => triggerEditClient(client)}
        >
          <FaEdit />
        </Button>
      </td>
    </tr>
  );
}
