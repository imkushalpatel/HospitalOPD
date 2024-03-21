import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsTrash, BsPencil, BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import patientService from "../../services/patientService";

const PatientList = ({ isDashboard }) => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        let response;
        if (isDashboard) {
          response = await patientService.getTodayPatients();
        } else {
          response = await patientService.getAllPatients();
        }
        setPatients(response);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [isDashboard]);

  const handleDelete = async (id) => {
    try {
      await patientService.deletePatient(id);
      // After deleting, fetch patients again to update the list
      const updatedPatients = patients.filter((patient) => patient._id !== id);
      setPatients(updatedPatients);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log("Edit patient with id:", id);
  };
  const handleAddVisit = (id) => {
    // Implement edit functionality here
    navigate("/add-visit/" + id);
    console.log("add patient visit with id:", id);
  };

  return (
    <Container>
      <h2>{isDashboard ? "Today's Added Patients" : "Patient List"}</h2>
      <Row>
        {patients.map((patient) => (
          <Col key={patient._id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <Row>
                    <Col>
                      {patient.firstname} {patient.lastname}
                    </Col>
                    <Col xs="auto">
                      <Button
                        variant="link"
                        onClick={() => handleAddVisit(patient._id)}
                      >
                        <BsPlusLg />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDelete(patient._id)}
                      >
                        <BsTrash />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleEdit(patient._id)}
                      >
                        <BsPencil />
                      </Button>
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {patient.email}
                  <br />
                  <strong>Phone:</strong> {patient.phone}
                  <br />
                  <strong>Gender:</strong> {patient.gender}
                  <br />
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(patient.DOB).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PatientList;
