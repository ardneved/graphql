import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientsQueries";

import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

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
          <h5 className="pt-3">Clients</h5>
          <table className="table table-hover mt-3">
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
          </table>
        </>
      )}
    </>
  );
}
