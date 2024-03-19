// src/components/Visits/AddVisitForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import visitService from "../../services/visitService";

const AddVisitForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: "",
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
      await visitService.addVisit(formData);
      navigate("/visits"); // Redirect to visit list after successful addition
    } catch (error) {
      console.error("Error adding visit:", error);
    }
  };

  return (
    <div>
      <h2>Add Visit</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPatientName">
          <Form.Label>Patient Name:</Form.Label>
          <Form.Control
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Add more form fields here */}
        <Button variant="primary" type="submit">
          Add Visit
        </Button>
      </Form>
    </div>
  );
};

export default AddVisitForm;
