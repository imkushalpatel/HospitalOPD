import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import patientService from "../../services/patientService";

const AddPatientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    DOB: "",
  });
  const [alert, setAlert] = useState({
    type: null,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await patientService.addPatient(formData);
      setAlert({ type: "success", message: response.message });
      setTimeout(() => {
        setAlert({ type: null, message: "" });
        navigate(-1);
      }, 3000);
    } catch (error) {
      setAlert({ type: "danger", message: error.response.data.message });
    }
  };

  return (
    <div>
      <h2>Add Patient</h2>
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formGender">
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDOB">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Patient
        </Button>
      </Form>
    </div>
  );
};

export default AddPatientForm;
