import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import patientService from "../../services/patientService";

const AddPatientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    // Add more form fields as needed
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
      await patientService.addPatient(formData);
      navigate("/patients");
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div>
      <h2>Add Patient</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Add more form fields here */}
        <Button variant="primary" type="submit">
          Add Patient
        </Button>
      </Form>
    </div>
  );
};

export default AddPatientForm;
