import { createRef } from "react";
import { AddClientModal} from '../components/AddClientModal'
import Clients from "../components/Clients";

export default function ClientsPage() {
  const modalRef = createRef()
  const onEditClient=(client)=>{
    modalRef.current.toggleModal(client);
  }


  return (
    <>
      <div className="gap-3 mb-4">
        <AddClientModal ref={modalRef}/>
      </div>
      <Clients editClient={onEditClient}/>
    </>
  );
}
