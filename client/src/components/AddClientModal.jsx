import { forwardRef, useImperativeHandle, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT, UPDATE_CLIENT } from "./mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientsQueries";
import { Button, Col, Form, Modal } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";

export const AddClientModal = forwardRef((props, ref) => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required("Please provide a valid email"),
    id: yup.string(),
  });

  useImperativeHandle(ref, () => ({
    toggleModal(initialValues) {
      setInitialValues(initialValues);
      handleShow();
    },
    // childFunction2() {
    //   console.log('child function 2 called');
    // },
  }));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    id: "",
  });
  const [values, setValues] = useState({});

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name: values.name, email: values.email, phone: values.phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
    onCompleted(data) {
      close();
    },
  });

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: {
      name: values.name,
      email: values.email,
      phone: values.phone,
      id: values.id,
    },
    update(cache, { data: { updateClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients.filter((x) => x.id !== values.id), updateClient],
        },
      });
    },
    onCompleted(data) {
      close();
    },
  });

  const onSubmit = (value) => {
    const { name, email, phone, id } = value;
    if (id) {
      updateClient({ name, email, phone, id });
    } else {
      addClient({ name, email, phone });
    }
  };

  const close = () => {
    setInitialValues({
      name: "",
      email: "",
      phone: "",
      id: "",
    });
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
        Add Client
      </Button>
      <Formik
        validationSchema={schema}
        onSubmit={(value) => onSubmit(value)}
        enableReinitialize
        initialValues={initialValues}
        innerRef={(formikActions) =>
          formikActions
            ? setValues(formikActions.values)
            : setValues(initialValues)
        }
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
              <Modal.Title>{values.id ? "Edit" : "Add"} Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group
                  as={Col}
                  controlId="validationFormik01"
                  className="mb-3"
                >
                  <Form.Label className="form-label">Name</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="validationFormik02"
                  className="mb-3"
                >
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control
                    placeholder="Email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="validationFormik03"
                  className="mb-3"
                >
                  <Form.Label className="form-label">Phone</Form.Label>
                  <Form.Control
                    placeholder="Phone"
                    name="phone"
                    type="text"
                    className="form-control"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                </Form.Group>
                <Button type="submit" className="btn btn-secondary float-end">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        )}
      </Formik>
    </>
  );
});
