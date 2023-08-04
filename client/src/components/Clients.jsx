import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientsQueries";

import ClientRow from "./ClientRow";
import Spinner from "./Spinner";
import { Table } from "react-bootstrap";

export default function Clients({ editClient }) {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onEditClient = (client) => {
    editClient(client);
  };
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <h5 className="pt-1 px-1">Clients</h5>
          <Table className="table table-hover mt-3" responsive="lg">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <ClientRow
                  key={client.id}
                  client={client}
                  triggerEditClient={onEditClient}
                />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
