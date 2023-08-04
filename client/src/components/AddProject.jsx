import { forwardRef, useImperativeHandle, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT, UPDATE_PROJECT } from "./mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectsQueries";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { PROJECT_STATUS } from "./constants/common";
import { GET_CLIENTS } from "../queries/clientsQueries";

export const AddProjectModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    toggleModal({ name, status, description, clientId, id }) {
      setName(name);
      setClientId(clientId);
      setDescription(description);
      setId(id);
      setStatus(projectStatuses.find((x) => x.name === status).value);
      handleShow();
    },
    // childFunction2() {
    //   console.log('child function 2 called');
    // },
  }));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [clientId, setClientId] = useState("");
  const [validated, setValidated] = useState(false);

  const projectStatuses = PROJECT_STATUS;
  const { data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, status, description, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
    onCompleted(data) {
      close();
    },
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { name, status, description, clientId, id },
    update(cache, { data: { updateProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects.filter((x) => x.id !== id), updateProject],
        },
      });
    },
    onCompleted(data) {
      close();
    },
  });

  const onSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
      e.stopPropagation();
      return;
    }
    if (id) {
      updateProject(name, status, description, clientId, id);
    } else {
      addProject(name, status, description, clientId);
    }
  };

  const close = () => {
    setValidated(false);
    setId("");
    setName("");
    setStatus("");
    setDescription("");
    setClientId("");
    handleClose();
  };

  return (
    <>
      <Button
        type="submit"
        className="btn btn-secondary float-end"
        onClick={handleShow}
      >
        <FaUser className="icon" />
        Add Project
      </Button>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Form.Group as={Col} controlId="validation-name" className="mb-3">
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control
                required
                placeholder="Name"
                aria-label="name"
                aria-describedby="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="validation-description"
              className="mb-3"
            >
              <Form.Label className="form-label">Description</Form.Label>
              <Form.Control
                required
                placeholder="Description"
                aria-label="description"
                aria-describedby="description"
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Status</Form.Label>
              <Form.Group as={Col} controlId="status">
                {projectStatuses.map((statusOption) => (
                  <Form.Check
                    required
                    inline
                    name="radio"
                    type="radio"
                    id={`default-radio-${status.value}`}
                    value={statusOption.value}
                    label={statusOption.name}
                    checked={statusOption.value === status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-radio"
                  />
                ))}
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Client</Form.Label>
              <Form.Select
                required
                value={clientId}
                id="clientId"
                aria-label="Default select example"
                onChange={(e) => setClientId(e.target.value)}
                className="form-select"
              >
                <option value="">Select a Client</option>
                {data?.clients.map((client) => (
                  <option value={client.id} key={client.id}>
                    {client.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="btn btn-secondary float-end">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
});
